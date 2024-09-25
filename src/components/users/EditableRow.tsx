import { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { Toast } from '../../components/ToastNotification'
import { useAppDispatch } from '../../app/store'
import { DeleteUser, EditUser } from '../../features/users/usersThunk'
import { UserInterface } from '../../interfaces/userInterface'

interface EditableRowProps {
    filteredUsers: UserInterface[]
}

function EditableRow({ filteredUsers }: EditableRowProps) {
    const [editRowId, setEditRowId] = useState<string | null>(null)
    const [editedUser, setEditedUser] = useState<Partial<UserInterface>>({})
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

    const dispatch = useAppDispatch()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserInterface) => {
        const { value } = e.target
        setEditedUser(prevValues => ({
            ...prevValues,
            [field]: value
        }))
    }

    const handleSaveUser = () => {
        if (editRowId) {
            dispatch(EditUser({ ...editedUser, id: editRowId } as UserInterface))
                .then(() => {
                    setEditRowId(null)
                })
                .catch((error) => {
                    console.error('Error editing user:', error)
                })
        }
    }

    const handleEditUser = (room: UserInterface) => {
        if (room._id) {
            setEditRowId(room._id)
        }
        setEditedUser(room)
        Toast({ message: 'User successfully edited', success: true })
        setMenuOpenId(null)
    }

    const handleDeleteUser = (id: string) => {
        dispatch(DeleteUser(id))
        Toast({ message: 'User successfully deleted', success: true })
        setMenuOpenId(null)
    }

    const handleMenuToggle = (id: string) => {
        setMenuOpenId(menuOpenId === id ? null : id)
    }


    return (
        <>
            <S.TableBody>
                {filteredUsers.map(user => (
                    <S.TableRow key={user._id}>
                        <S.TableCell>
                            <S.TablePhoto src={user.Photo} alt={user.FullName} />
                            {editRowId === user._id ? (
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
                            {editRowId === user._id ? (
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
                            {editRowId === user._id ? (
                                <S.Input
                                    type="date"
                                    value={editedUser.EntryDate ? new Date(editedUser.EntryDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleInputChange(e, 'EntryDate')}
                                />
                            ) : (
                                user.EntryDate instanceof Date ? user.EntryDate.toLocaleDateString() : user.EntryDate
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user._id ? (
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
                            {editRowId === user._id ? (
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
                            {editRowId === user._id ? (
                                <S.Button onClick={() => handleSaveUser()}>Save</S.Button>
                            ) : (
                                <S.ActionMenu>
                                    <S.MoreButton onClick={() => handleMenuToggle(user._id || '')}>
                                        &#x22EE;
                                    </S.MoreButton>
                                    {menuOpenId === user._id && (
                                        <S.Menu>
                                            <S.MenuItem onClick={() => handleEditUser(user)}>Edit</S.MenuItem>
                                            <S.MenuItem onClick={() => handleDeleteUser(user._id || '')}>Delete</S.MenuItem>
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