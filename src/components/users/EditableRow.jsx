import React, { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { useDispatch } from 'react-redux'
import { DeleteUser, EditUser } from '../../features/users/usersThunk'

function EditableRow({ filteredUsers }) {
    const [editRowId, setEditRowId] = useState(null)
    const [editedUser, setEditedUser] = useState({})
    const [menuOpenId, setMenuOpenId] = useState(null)

    const dispatch = useDispatch()

    const handleInputChange = (e, field, subField) => {
        if (subField) {
            setEditedUser({
                ...editedUser,
                [field]: {
                    ...editedUser[field],
                    [subField]: e.target.value
                }
            })
        } else {
            setEditedUser({
                ...editedUser,
                [field]: e.target.value
            })
        }
    }

    const handleSaveUser = () => {
        dispatch(EditUser(editedUser))
        setEditRowId(null)
    }

    const handleEditUser = (room) => {
        setEditRowId(room.id)
        setEditedUser(room)
        setMenuOpenId(null)
    }

    const handleDeleteUser = (id) => {
        dispatch(DeleteUser(id))
        setMenuOpenId(null)
    }

    const handleMenuToggle = (id) => {
        setMenuOpenId(menuOpenId === id ? null : id)
    }


    return (
        <>
            <S.TableBody>
                {filteredUsers.map(user => (
                    <S.TableRow key={user.id}>
                        <S.TableCell>
                            <S.TablePhoto src={user.Photo} alt={user.FullName} />
                            {editRowId === user.id ? (
                                <S.Input
                                    type="text"
                                    value={editedUser.FullName}
                                    onChange={(e) => handleInputChange(e, 'FullName')}
                                    placeholder="Enter full name"
                                />
                            ) : (
                                user.FullName
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user.id ? (
                                <S.Input
                                    type="text"
                                    value={editedUser.PositionDescription}
                                    onChange={(e) => handleInputChange(e, 'PositionDescription')}
                                    placeholder="Enter position description"
                                />
                            ) : (
                                user.PositionDescription
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user.id ? (
                                <S.Input
                                    type="date"
                                    value={editedUser.EntryDate}
                                    onChange={(e) => handleInputChange(e, 'EntryDate')}
                                />
                            ) : (
                                user.EntryDate
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user.id ? (
                                <S.Input
                                    type="tel"
                                    value={editedUser.Phone}
                                    onChange={(e) => handleInputChange(e, 'Phone')}
                                    placeholder="Enter phone number"
                                />
                            ) : (
                                user.Phone
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user.id ? (
                                <S.Input
                                    type="text"
                                    value={editedUser.State}
                                    onChange={(e) => handleInputChange(e, 'State')}
                                    placeholder="Enter state"
                                />
                            ) : (
                                user.State
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user.id ? (
                                <S.Button onClick={() => handleSaveUser(user.id)}>Save</S.Button>
                            ) : (
                                <S.ActionMenu>
                                    <S.MoreButton onClick={() => handleMenuToggle(user.id)}>
                                        &#x22EE;
                                    </S.MoreButton>
                                    {menuOpenId === user.id && (
                                        <S.Menu>
                                            <S.MenuItem onClick={() => handleEditUser(user)}>Edit</S.MenuItem>
                                            <S.MenuItem onClick={() => handleDeleteUser(user.id)}>Delete</S.MenuItem>
                                        </S.Menu>
                                    )}
                                </S.ActionMenu>
                            )}
                        </S.TableCell>
                    </S.TableRow>
                ))}
            </S.TableBody>
        </>
    )
}

export default EditableRow