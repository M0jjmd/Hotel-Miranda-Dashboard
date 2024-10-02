import { useState } from 'react'
import * as S from '../../styles/tablesForm'
import { Toast } from '../../components/ToastNotification'
import { useAppDispatch } from '../../app/store'
import { CreateUser, GetUsers } from '../../features/users/usersThunk'
import { useAuth } from '../../context/AuthContext'
import { UserInterface } from '../../interfaces/userInterface'

const AddUsers = () => {
    const userDispatch = useAppDispatch()
    const [formValues, setFormValues] = useState<Partial<UserInterface>>({
        username: '',
        fullname: '',
        password: '',
        email: '',
        photo: '',
        entry_date: new Date(),
        position_description: '',
        phone: '',
        state: 'active',
        position: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        if (name === 'entry_date') {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: new Date(value),
            }))
        } else {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: value,
            }))
        }
    }

    const formatDateForMySQL = (date: Date): string => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')

        return `${year}-${month}-${day} ${hours}:${minutes}:00`
    }

    const { dispatch } = useAuth()

    const handleAddUser = (e: React.FormEvent): void => {
        e.preventDefault()

        const userWithId = {
            username: (formValues.fullname || '').replace(/\s+/g, '').toLowerCase(),
            fullname: formValues.fullname || '',
            password: formValues.password || '',
            email: formValues.email || '',
            photo: formValues.photo || '',
            entry_date: formValues.entry_date instanceof Date
                ? formatDateForMySQL(formValues.entry_date)
                : (typeof formValues.entry_date === 'string' ? formValues.entry_date : new Date()),
            position_description: formValues.position_description || '',
            phone: formValues.phone || '',
            state: formValues.state || 'active',
            position: formValues.position_description || '',
        }

        userDispatch(CreateUser(userWithId))
            .then(() => {
                userDispatch(GetUsers())
                Toast({ message: 'Added user successfully', success: true })
                dispatch({ type: 'CLOSE_FORM' })
            })
            .catch((error) => {
                console.error('Error creating user:', error)
            })
    }

    return (
        <S.FormContainer>
            <h3>Add New User</h3>
            <label>Photo URL</label>
            <S.Input
                type="text"
                name="photo"
                placeholder="Enter photo URL"
                value={formValues.photo}
                onChange={handleChange}
            />

            <label>Full Name</label>
            <S.Input
                type="text"
                name="fullname"
                placeholder="Enter full name"
                value={formValues.fullname}
                onChange={handleChange}
            />

            <label>Employee Password</label>
            <S.Input
                type="text"
                name="password"
                placeholder="Enter employee password"
                value={formValues.password}
                onChange={handleChange}
            />

            <label>Email</label>
            <S.Input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formValues.email}
                onChange={handleChange}
            />

            <label>Entry Date</label>
            <S.Input
                type="date"
                name="entry_date"
                value={formValues.entry_date ? new Date(formValues.entry_date).toISOString().slice(0, 10) : ''}
                onChange={handleChange}
            />

            <label>Position Description</label>
            <S.Input
                type="text"
                name="position_description"
                placeholder="Enter position description"
                value={formValues.position_description}
                onChange={handleChange}
            />

            <label>Phone</label>
            <S.Input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formValues.phone}
                onChange={handleChange}
            />

            <label>Status</label>
            <S.ToggleButton
                active={formValues.state === 'active'}
                onClick={() => setFormValues(prevValues => ({
                    ...prevValues,
                    state: prevValues.state === 'active' ? 'inactive' : 'active'
                }))}
            >
                {formValues.state}
            </S.ToggleButton>

            <S.Button onClick={handleAddUser}>Add User</S.Button>
        </S.FormContainer>
    )
}

export default AddUsers 