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
    const [editRowId, setEditRowId] = useState<number | null>(null)
    const [editedUser, setEditedUser] = useState<Partial<UserInterface>>({})
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

    const dispatch = useAppDispatch()

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: keyof UserInterface
    ) => {
        const { value } = e.target
        const newValue =
            field === "entry_date" ? new Date(value) : value

        setEditedUser((prevValues) => ({
            ...prevValues,
            [field]: newValue,
        }))
    }

    const handleSaveUser = () => {
        if (editRowId) {
            const userToSave = {
                ...editedUser,
                id: editRowId,
                entry_date:
                    editedUser.entry_date instanceof Date
                        ? formatDateForMySQL(editedUser.entry_date)
                        : editedUser.entry_date,
            } as UserInterface

            dispatch(EditUser(userToSave))
                .then(() => {
                    setEditRowId(null)
                    Toast({ message: 'User successfully edited', success: true })
                })
                .catch((error) => {
                    console.error("Error editing user:", error)
                })
        }
    }

    const handleEditUser = (user: UserInterface) => {
        setEditRowId(user.id ?? null)
        setEditedUser({
            ...user,
            entry_date: user.entry_date instanceof Date ? user.entry_date : new Date(user.entry_date)
        })
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

    const formatDate = (dateString: string | Date): string => {
        if (!dateString) return ""
        const date =
            dateString instanceof Date ? dateString : new Date(dateString)
        return date.toLocaleDateString()
    }

    const formatDateForMySQL = (date: Date): string => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${year}-${month}-${day} ${hours}:${minutes}:00`
    }

    return (
        <>
            <S.TableBody>

                {filteredUsers.map(user => (
                    <S.TableRow key={user.id}>
                        <S.TableCell>
                            <S.TablePhoto src={user.photo} alt={user.fullname} />
                            {editRowId === user.id ? (
                                <S.Input
                                    type="text"
                                    value={editedUser.fullname ?? ''}
                                    onChange={(e) => handleInputChange(e, 'fullname')}
                                    placeholder="Enter full name"
                                />
                            ) : (
                                user.fullname
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user.id ? (
                                <S.Input
                                    type="text"
                                    value={editedUser.position_description ?? ''}
                                    onChange={(e) => handleInputChange(e, 'position_description')}
                                    placeholder="Enter position description"
                                />
                            ) : (
                                user.position_description
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user.id ? (
                                <S.Input
                                    type="date"
                                    value={
                                        editedUser.entry_date
                                            ? new Date(editedUser.entry_date).toISOString().slice(0, 10)
                                            : ""
                                    }
                                    onChange={(e) => handleInputChange(e, "entry_date")}
                                />
                            ) : (
                                formatDate(user.entry_date instanceof Date ? user.entry_date.toISOString() : user.entry_date)
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user.id ? (
                                <S.Input
                                    type="tel"
                                    value={editedUser.phone ?? ''}
                                    onChange={(e) => handleInputChange(e, 'phone')}
                                    placeholder="Enter phone number"
                                />
                            ) : (
                                user.phone
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user.id ? (
                                <S.Select
                                    value={editedUser.state ?? 'active'}
                                    onChange={(e) => handleInputChange(e, 'state')}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </S.Select>
                            ) : (
                                user.state
                            )}
                        </S.TableCell>
                        <S.TableCell>
                            {editRowId === user.id ? (
                                <S.Button onClick={() => handleSaveUser()}>Save</S.Button>
                            ) : (
                                <S.ActionMenu>
                                    <S.MoreButton onClick={() => handleMenuToggle(user.id?.toString() || '')}>
                                        &#x22EE;
                                    </S.MoreButton>
                                    {menuOpenId === user.id?.toString() && (
                                        <S.Menu>
                                            <S.MenuItem onClick={() => handleEditUser(user)}>Edit</S.MenuItem>
                                            <S.MenuItem onClick={() => handleDeleteUser(user.id?.toString() || '')}>Delete</S.MenuItem>
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