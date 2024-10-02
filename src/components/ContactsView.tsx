import { ChangeEvent, useEffect, useState } from 'react'
import * as S from '../styles/tablesForm'
import * as T from '../styles/contactStyles'
import { Toast } from '../components/ToastNotification'
import { GetContacts, GetSingleContact, updateArchiveStatus } from '../features/contacts/contactsThunk'
import { useAppDispatch, useAppSelector } from '../app/store'
import { ContactInterface } from '../interfaces/contactInterface'
import { useNavigate } from 'react-router-dom'

function ContactsView() {
    const [filter, setFilter] = useState<'NOT-ARCHIVED' | 'ARCHIVED'>('NOT-ARCHIVED')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedMessage, setSelectedMessage] = useState<number | null>(null)

    const dispatchContacts = useAppDispatch()
    const contacts = useAppSelector((state) => state.contacts.data)
    const contactsStatus = useAppSelector((state) => state.contacts.status)
    const singleMessages = useAppSelector((state) => state.contacts.singleContact)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            localStorage.clear()
            navigate('/')
            return
        }

        if (contactsStatus === 'idle') {
            dispatchContacts(GetContacts())
        }
        if (contactsStatus === 'failed') {
            localStorage.clear()
            Toast({ message: 'your session expired, log in again', success: false })
            navigate('/')
        }
    }, [dispatchContacts, contactsStatus])

    const filteredContacts = contacts.filter((contact: ContactInterface) => {
        const isArchivedFilter = (filter === 'NOT-ARCHIVED' && contact.archive) ||
            (filter === 'ARCHIVED' && !contact.archive)
        if (isArchivedFilter) return false

        const combinedString = JSON.stringify(contact).toLowerCase()
        return combinedString.includes(searchTerm.toLowerCase())
    })

    const latestMessages = contacts.slice(-3)

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleMessageClick = (id: number) => {
        setSelectedMessage(id)
        dispatchContacts(GetSingleContact(id))
    }

    const handleClosePopup = () => {
        setSelectedMessage(null)
    }

    const handleArchiveToggle = async (contactId: number) => {
        const contact = contacts.find((c: ContactInterface) => c.id === contactId)

        if (!contact) {
            console.error('Contact not found')
            return
        }

        const updatedArchiveStatus = !contact.archive

        try {
            const updatedContact = await dispatchContacts(
                updateArchiveStatus({ id: String(contactId), archiveStatus: updatedArchiveStatus }))
                .unwrap()
            console.log('Contact updated:', updatedContact)
            dispatchContacts(GetContacts())
        } catch (error) {
            console.error('Error updating contact:', error)
        }
    }

    return (
        <>
            <S.Container>
                <S.FilterContainer>
                    <S.SearchInput
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <S.Button active={filter === 'NOT-ARCHIVED'} onClick={() => setFilter('NOT-ARCHIVED')}>Not Archived</S.Button>
                    <S.Button active={filter === 'ARCHIVED'} onClick={() => setFilter('ARCHIVED')}>Archived</S.Button>
                </S.FilterContainer>
                {filteredContacts.length === 0 ? (
                    <tr>
                        <S.TableCell colSpan={5}>No hay registros</S.TableCell>
                    </tr>
                ) : (
                    <>
                        <T.QuickView>
                            <h2>Quick View - Latest Messages</h2>
                            {latestMessages.map(message => (
                                <T.MessagePreview key={message.id} onClick={() => handleMessageClick(Number(message.id))}>
                                    <strong>{message.subject}</strong> - {message.comment.slice(0, 50)}...
                                </T.MessagePreview>
                            ))}
                        </T.QuickView>

                        {selectedMessage && (
                            <T.Popup>
                                <T.PopupContent>
                                    {singleMessages ? (
                                        <>
                                            <h3>{singleMessages.subject}</h3>
                                            <p>{singleMessages.comment}</p>
                                            <T.CloseButton onClick={handleClosePopup}>Close</T.CloseButton>
                                        </>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </T.PopupContent>
                            </T.Popup>
                        )}

                        <S.Table>
                            <S.TableHeader>
                                <tr>
                                    <S.HeaderCell>ID</S.HeaderCell>
                                    <S.HeaderCell>Date</S.HeaderCell>
                                    <S.HeaderCell>Subject</S.HeaderCell>
                                    <S.HeaderCell>Comment</S.HeaderCell>
                                    <S.HeaderCell>Action</S.HeaderCell>
                                </tr>
                            </S.TableHeader>
                            <S.TableBody>
                                {filteredContacts.map(contact => (
                                    <S.TableRow
                                        key={contact.id}
                                        onClick={() => handleMessageClick(Number(contact.id))}
                                    >
                                        <S.TableCell>{contact.id}</S.TableCell>
                                        <S.TableCell>{new Date(contact.date).toLocaleDateString('en-GB')}</S.TableCell>
                                        <S.TableCell>{contact.subject}</S.TableCell>
                                        <S.TableCell>{contact.comment.slice(0, 50)}...</S.TableCell>
                                        <S.TableCell>
                                            <T.ActionButton onClick={(e) => { e.stopPropagation(); handleArchiveToggle(Number(contact.id)) }}>
                                                {contact.archive ? (<span>Archived</span>) : (<span>No Archived</span>)}
                                            </T.ActionButton>
                                        </S.TableCell>
                                    </S.TableRow>
                                ))}
                            </S.TableBody>
                        </S.Table>
                    </>)}
            </S.Container>
        </>
    )
}

export default ContactsView