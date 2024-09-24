import { useState } from 'react'
import { useAppDispatch } from '../../app/store'
import { CreateUser, GetUsers } from '../../features/users/usersThunk'
import { useAuth } from '../../context/AuthContext'
import { UserInterface } from '../../interfaces/userInterface'
import * as S from '../../styles/tablesForm'

const AddUsers = () => {
    const userDispatch = useAppDispatch()
    const [formValues, setFormValues] = useState<Partial<UserInterface>>({
        username: '',
        FullName: '',
        password: '',
        Email: '',
        Photo: '',
        EntryDate: new Date,
        PositionDescription: '',
        Phone: '',
        State: 'ACTIVE',
        position: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        if (name === 'EntryDate') {
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

    const { dispatch } = useAuth()

    const handleAddUser = (e: React.FormEvent): void => {
        e.preventDefault()

        const userWithId = {
            username: (formValues.FullName || '').replace(/\s+/g, '').toLowerCase(),
            FullName: formValues.FullName || '',
            password: formValues.password || '',
            Email: formValues.Email || '',
            Photo: formValues.Photo || '',
            EntryDate: formValues.EntryDate || new Date,
            PositionDescription: formValues.PositionDescription || '',
            Phone: formValues.Phone || '',
            State: formValues.State || 'ACTIVE',
            position: formValues.PositionDescription || '',
        }

        userDispatch(CreateUser(userWithId))
            .then(() => {
                userDispatch(GetUsers())
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
                name="Photo"
                placeholder="Enter photo URL"
                value={formValues.Photo}
                onChange={handleChange}
            />

            <label>Full Name</label>
            <S.Input
                type="text"
                name="FullName"
                placeholder="Enter full name"
                value={formValues.FullName}
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
                name="Email"
                placeholder="Enter email"
                value={formValues.Email}
                onChange={handleChange}
            />

            <label>Entry Date</label>
            <S.Input
                type="date"
                name="EntryDate"
                value={formValues.EntryDate ? formValues.EntryDate.toISOString().split('T')[0] : ''}
                onChange={handleChange}
            />

            <label>Position Description</label>
            <S.Input
                type="text"
                name="PositionDescription"
                placeholder="Enter position description"
                value={formValues.PositionDescription}
                onChange={handleChange}
            />

            <label>Phone</label>
            <S.Input
                type="tel"
                name="Phone"
                placeholder="Enter phone number"
                value={formValues.Phone}
                onChange={handleChange}
            />

            <label>Status</label>
            <S.ToggleButton
                active={formValues.State === 'ACTIVE'}
                onClick={() => setFormValues(prevValues => ({
                    ...prevValues,
                    State: prevValues.State === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
                }))}
            >
                {formValues.State}
            </S.ToggleButton>

            <S.Button onClick={handleAddUser}>Add User</S.Button>
        </S.FormContainer>
    )
}

export default AddUsers