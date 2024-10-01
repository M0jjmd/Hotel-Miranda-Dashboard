import React, { useEffect, useState } from 'react'
import * as S from '../styles/tablesForm'
import { Toast } from '../components/ToastNotification'
import { useAppDispatch, useAppSelector } from '../app/store'
import { GetUsers } from '../features/users/usersThunk'
import { useAuth } from '../context/AuthContext'
import EditableRow from './users/EditableRow'
import AddUsers from './users/AddUsers'
import { useNavigate } from 'react-router-dom'

function UsersList() {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const { state, dispatch } = useAuth()

  const dispatchUsers = useAppDispatch()

  const users = useAppSelector((state) => state.users.data)
  const usersStatus = useAppSelector((state) => state.users.status)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      localStorage.clear()
      navigate('/')
      return
    }

    if (usersStatus === 'idle') {
      dispatchUsers(GetUsers())
      dispatch({ type: 'CLOSE_FORM' })
    }
    if (usersStatus === 'failed') {
      localStorage.clear()
      Toast({ message: 'your session expired, log in again', success: false })
      navigate('/')
    }
  }, [dispatchUsers, usersStatus, users.length])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const filteredUsers = users
    .filter(user => {
      if (filter !== 'ALL' && user.state.toLowerCase() !== filter.toLowerCase()) return false
      const combinedString = JSON.stringify(user).toLowerCase()
      return combinedString.includes(searchTerm.toLowerCase())
    })

  const handleFormToggle = () => {
    if (state.isFormOpen) {
      dispatch({ type: 'CLOSE_FORM' })
    } else {
      dispatch({ type: 'OPEN_FORM' })
    }
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
        <S.Button active={filter === 'ALL'} onClick={() => setFilter('ALL')}>All Employees</S.Button>
        <S.Button active={filter === 'ACTIVE'} onClick={() => setFilter('ACTIVE')}>Active Employees</S.Button>
        <S.Button active={filter === 'INACTIVE'} onClick={() => setFilter('INACTIVE')}>Inactive Employees</S.Button>
        <S.AddButton onClick={handleFormToggle}>Add User</S.AddButton>
      </S.FilterContainer>

      {state.isFormOpen ? (
        <>
          <AddUsers />
        </>
      ) : (
        <>
          {filteredUsers.length > 0 ? (
            <S.Table>
              <S.TableHeader>
                <tr>
                  <S.HeaderCell>Name</S.HeaderCell>
                  <S.HeaderCell>Job Desk</S.HeaderCell>
                  <S.HeaderCell>Schedule</S.HeaderCell>
                  <S.HeaderCell>Contact</S.HeaderCell>
                  <S.HeaderCell>Status</S.HeaderCell>
                  <S.HeaderCell>Actions</S.HeaderCell>
                </tr>
              </S.TableHeader>

              <EditableRow filteredUsers={filteredUsers} />
            </S.Table>
          ) : (
            <S.NoResults>No search results found</S.NoResults>
          )
          }
        </>
      )}
    </S.Container>
  )
}

export default UsersList