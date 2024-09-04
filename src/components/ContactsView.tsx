import { ChangeEvent, useEffect, useState } from 'react'
import * as S from '../styles/tablesForm'
import * as T from '../styles/contactStyles'
import { GetContacts, GetSingleContact, updateArchiveStatus } from '../features/contacts/contactsThunk'
import { useAppDispatch, useAppSelector } from '../app/store'
import { Contact } from '../interfaces/contactInterface'

function ContactsView() {
    const [filter, setFilter] = useState<'ALL' | 'ARCHIVED'>('ALL')
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [selectedMessage, setSelectedMessage] = useState<string | null>(null)

    const dispatchContacts = useAppDispatch()
    const contacts = useAppSelector((state) => state.contacts.data)
    const contactsStatus = useAppSelector((state) => state.contacts.status)
    const singleMessages = useAppSelector((state) => state.contacts.singleContact)

    useEffect(() => {
        if (contactsStatus === 'idle') {
            dispatchContacts(GetContacts())
        }
    }, [dispatchContacts, contactsStatus])

    const filteredContacts = contacts.filter((contact: Contact) => {
        if (filter === 'ALL' && contact.actions.archive) return false
        if (filter === 'ARCHIVED' && !contact.actions.archive) return false

        const combinedString = JSON.stringify(contact).toLowerCase()
        return combinedString.includes(searchTerm.toLowerCase())
    })

    const latestMessages = contacts.slice(-3)

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    const handleMessageClick = (id: string) => {
        setSelectedMessage(id)
        dispatchContacts(GetSingleContact(id))
    }

    const handleClosePopup = () => {
        setSelectedMessage(null)
    }

    const handleArchiveToggle = async (contactId: string) => {
        const contact = contacts.find((c: Contact) => c.id === contactId)

        if (!contact) {
            console.error('Contact not found')
            return
        }

        const updatedArchiveStatus = !contact.actions.archive

        try {
            await dispatchContacts(updateArchiveStatus({ id: contactId, archiveStatus: updatedArchiveStatus })).unwrap()
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
                    <S.Button active={filter === 'ALL'} onClick={() => setFilter('ALL')}>Archived</S.Button>
                    <S.Button active={filter === 'ARCHIVED'} onClick={() => setFilter('ARCHIVED')}>No Archived</S.Button>
                </S.FilterContainer>

                <T.QuickView>
                    <h2>Quick View - Latest Messages</h2>
                    {latestMessages.map(message => (
                        <T.MessagePreview key={message.id} onClick={() => handleMessageClick(message.id)}>
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
                            <S.HeaderCell>Date</S.HeaderCell>
                            <S.HeaderCell>ID</S.HeaderCell>
                            <S.HeaderCell>Customer</S.HeaderCell>
                            <S.HeaderCell>Email</S.HeaderCell>
                            <S.HeaderCell>Phone</S.HeaderCell>
                            <S.HeaderCell>Subject</S.HeaderCell>
                            <S.HeaderCell>Comment</S.HeaderCell>
                            <S.HeaderCell>Action</S.HeaderCell>
                        </tr>
                    </S.TableHeader>
                    <S.TableBody>
                        {filteredContacts.map(contact => (
                            <S.TableRow key={contact.id}>
                                <S.TableCell>{new Date(contact.date).toLocaleString()}</S.TableCell>
                                <S.TableCell>{contact.id}</S.TableCell>
                                <S.TableCell>{contact.customer.name}</S.TableCell>
                                <S.TableCell>{contact.customer.email}</S.TableCell>
                                <S.TableCell>{contact.customer.phone}</S.TableCell>
                                <S.TableCell>{contact.subject}</S.TableCell>
                                <S.TableCell>{contact.comment.slice(0, 50)}...</S.TableCell>
                                <S.TableCell>
                                    <T.ActionButton onClick={() => handleArchiveToggle(contact.id)}>
                                        {contact.actions.archive ? (<span>Archived</span>) : (<span>No Archived</span>)}
                                    </T.ActionButton>
                                </S.TableCell>
                            </S.TableRow>
                        ))}
                    </S.TableBody>
                </S.Table>
            </S.Container>
        </>
    )
}

export default ContactsView