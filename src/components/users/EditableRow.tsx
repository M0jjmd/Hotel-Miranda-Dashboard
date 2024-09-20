import { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { useAppDispatch } from '../../app/store'
import { DeleteUser, EditUser } from '../../features/users/usersThunk'
import { Users } from '../../interfaces/usersInterface'

interface EditableRowProps {
    filteredUsers: Users[]
}

function EditableRow({ filteredUsers }: EditableRowProps) {
    const [editRowId, setEditRowId] = useState<string | null>(null)
    const [editedUser, setEditedUser] = useState<Partial<Users>>({})
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

    const dispatch = useAppDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Users) => {
        const { value } = e.target
        setEditedUser(prevValues => ({
            ...prevValues,
            [field]: value
        }))
    }

    const handleSaveUser = () => {
        if (editRowId) {
            dispatch(EditUser({ ...editedUser, id: editRowId } as Users))
                .then(() => {
                    setEditRowId(null)
                })
                .catch((error) => {
                    console.error('Error editing user:', error)
                })
        }
    }

    const handleEditUser = (room: Users) => {
        setEditRowId(room.id)
        setEditedUser(room)
        setMenuOpenId(null)
    }

    const handleDeleteUser = (id: string) => {
        dispatch(DeleteUser(id))
        setMenuOpenId(null)
    }

    const handleMenuToggle = (id: string) => {
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
                                    value={editedUser.FullName ?? ''}
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
                                    value={editedUser.PositionDescription ?? ''}
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
                                    value={editedUser.EntryDate ?? ''}
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
                                    value={editedUser.Phone ?? ''}
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
                                    value={editedUser.State ?? ''}
                                    onChange={(e) => handleInputChange(e, 'State')}
                                    placeholder="Enter state"
                                />
                            ) : (
                                user.State
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user.id ? (
                                <S.Button onClick={() => handleSaveUser()}>Save</S.Button>
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