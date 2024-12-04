import { useState } from 'react'
import * as S from '../../styles/tablesForm'
import * as E from '../../styles/editViewStyles'
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

    const handleStatusToggle = () => {
        if (editRowId) {
            const newState = editedUser.State === 'Active' ? 'Inactive' : 'Active'
            setEditedUser(prevValues => ({
                ...prevValues,
                State: newState
            }))
        }
    }

    const handleSaveUser = () => {
        if (editRowId) {
            dispatch(EditUser({ ...editedUser, id: editRowId } as UserInterface))
                .then(() => {
                    Toast({ message: 'User successfully edited', success: true })
                    setEditRowId(null)
                })
                .catch((error) => {
                    Toast({ message: 'Error deleting user', success: true })
                    console.error('Error editing user:', error)
                })
        }
    }

    const handleEditUser = (room: UserInterface) => {
        if (room._id) {
            setEditRowId(room._id)
        }
        setEditedUser(room)
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
            <E.TableBody>
                {filteredUsers.filter(user => user.position.toLowerCase() !== 'admin').map(user => (
                    <E.TableRow key={user._id}>
                        <E.TableCell>
                            <E.TableCellUserInfo>
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
                            </E.TableCellUserInfo>
                            <E.TablePhoto src={user.Photo} alt={'No foto'} />
                        </E.TableCell>
                        <E.TableCell>
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
                        </E.TableCell>
                        <E.TableCell>
                            {editRowId === user._id ? (
                                <S.Input
                                    type="date"
                                    value={editedUser.EntryDate ? new Date(editedUser.EntryDate).toISOString().split('T')[0] : ''}
                                    onChange={(e) => handleInputChange(e, 'EntryDate')}
                                />
                            ) : (
                                user.EntryDate instanceof Date ? user.EntryDate.toLocaleDateString() : user.EntryDate
                            )}
                        </E.TableCell>
                        <E.TableCell>
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
                        </E.TableCell>
                        <E.TableCell>
                            {editRowId === user._id ? (
                                <E.StatusButton
                                    active={editedUser.State === 'Active'}
                                    onClick={handleStatusToggle}
                                >
                                    {editedUser.State === 'Active' ? 'Active' : 'Inactive'}
                                </E.StatusButton>
                            ) : (
                                <E.StatusSpan active={user.State === 'Active'}>
                                    {user.State}
                                </E.StatusSpan>
                            )}
                        </E.TableCell>
                        <E.TableCell>
                            {editRowId === user._id ? (
                                <S.Button onClick={() => handleSaveUser()}>Save</S.Button>
                            ) : (
                                <E.ActionMenu>
                                    <E.MoreButton onClick={() => handleMenuToggle(user._id || '')}>
                                        &#x22EE;
                                    </E.MoreButton>
                                    {menuOpenId === user._id && (
                                        <E.Menu>
                                            <E.MenuItem onClick={() => handleEditUser(user)}>Edit</E.MenuItem>
                                            <E.MenuItem onClick={() => handleDeleteUser(user._id || '')}>Delete</E.MenuItem>
                                        </E.Menu>
                                    )}
                                </E.ActionMenu>
                            )}
                        </E.TableCell>
                    </E.TableRow>
                ))}
            </E.TableBody>
        </>
    )
}

export default EditableRow