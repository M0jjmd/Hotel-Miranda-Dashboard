import React, { useState } from 'react'
import * as S from '../styles/tablesForm'
import * as T from '../styles/contactStyles'

function ContactsView({ contactsView }) {
    const [filter, setFilter] = useState('ALL')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMessage, setSelectedMessage] = useState(null)

    const filteredContacts = contactsView
        .filter(contact => {
            if (filter === 'ALL' && contact.actions.archive) return false
            if (filter === 'ARCHIVED' && !contact.actions.archive) return false

            const combinedString = JSON.stringify(contact).toLowerCase()
            return combinedString.includes(searchTerm.toLowerCase())
        })

    const latestMessages = contactsView.slice(-3)

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleMessageClick = (message) => {
        setSelectedMessage(message)
    }

    const handleClosePopup = () => {
        setSelectedMessage(null)
    }

    return (
        <S.Container>
            <S.FilterContainer>
                <S.SearchInput
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <S.Button active={filter === 'ALL'} onClick={() => setFilter('ALL')}>All Contacts</S.Button>
                <S.Button active={filter === 'ARCHIVED'} onClick={() => setFilter('ARCHIVED')}>Archived</S.Button>
            </S.FilterContainer>

            <T.QuickView>
                <h2>Quick View - Latest Messages</h2>
                {latestMessages.map(contact => (
                    <T.MessagePreview key={contact.id} onClick={() => handleMessageClick(contact)}>
                        <strong>{contact.subject}</strong> - {contact.comment.slice(0, 50)}...
                    </T.MessagePreview>
                ))}
            </T.QuickView>

            {selectedMessage && (
                <T.Popup>
                    <T.PopupContent>
                        <h3>{selectedMessage.subject}</h3>
                        <p>{selectedMessage.comment}</p>
                        <T.CloseButton onClick={handleClosePopup}>Close</T.CloseButton>
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
                            <S.TableCell>{contact.actions.archive ? (<span>Archived</span>) : (<span>No Archived</span>)}</S.TableCell>
                        </S.TableRow>
                    ))}
                </S.TableBody>
            </S.Table>

            <S.FormContainer>
                <h3>Create New Message</h3>
                <S.Input type="text" placeholder="Name" />
                <S.Input type="email" placeholder="Email" />
                <S.Input type="tel" placeholder="Phone" />
                <S.Input type="text" placeholder="Subject" />
                <S.TextArea placeholder="Message" />
                <S.Button>Create Message</S.Button>
            </S.FormContainer>
        </S.Container>
    )
}

export default ContactsView