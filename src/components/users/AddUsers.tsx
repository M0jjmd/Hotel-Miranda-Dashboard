import { useState } from 'react'
import { useAppDispatch } from '../../app/store'
import { CreateUser, GetUsers } from '../../features/users/usersThunk'
import { useAuth } from '../../context/AuthContext'
import { Users } from '../../interfaces/usersInterface'
import * as S from '../../styles/tablesForm'

const AddUsers = () => {
    const userDispatch = useAppDispatch()
    const [formValues, setFormValues] = useState<Partial<Users>>({
        Photo: '',
        FullName: '',
        EmployeeId: '',
        Email: '',
        EntryDate: '',
        PositionDescription: '',
        Phone: '',
        State: 'ACTIVE',
    })

    const generateRandomId = () => {
        return Math.floor(1000 + Math.random() * 9000).toString()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }

    const { dispatch } = useAuth()

    const handleAddUser = (e: React.FormEvent): void => {
        e.preventDefault()

        const userWithId = {
            Photo: formValues.Photo || '',
            FullName: formValues.FullName || '',
            EmployeeId: formValues.EmployeeId || '',
            Email: formValues.Email || '',
            EntryDate: formValues.EntryDate || '',
            PositionDescription: formValues.PositionDescription || '',
            Phone: formValues.Phone || '',
            State: formValues.State || 'ACTIVE',
            id: generateRandomId(),
        } as Users

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

            <label>Employee ID</label>
            <S.Input
                type="text"
                name="EmployeeId"
                placeholder="Enter employee ID"
                value={formValues.EmployeeId}
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
                value={formValues.EntryDate}
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