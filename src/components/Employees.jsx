import React, { useEffect, useState } from 'react'
import * as S from '../styles/tablesForm'
import { useDispatch, useSelector } from 'react-redux'
import { GetUsers } from '../features/users/usersThunk'
import { useAuth } from '../context/AuthContext'
import EditableRow from './users/EditableRow'
import AddUsers from './users/AddUsers'

function Employees() {
  const [filter, setFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const { state, dispatch } = useAuth()

  const dipatchRooms = useDispatch()

  const users = useSelector((state) => state.users.data)
  const usersStatus = useSelector((state) => state.users.status)

  useEffect(() => {
    if (usersStatus === 'idle') {
      dipatchRooms(GetUsers())
      dispatch({ type: 'CLOSE_FORM' })
    }
  }, [dipatchRooms, usersStatus])

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  const filteredUsers = users
    .filter(user => {
      if (filter !== 'ALL' && user.State !== filter) return false
      const combinedString = JSON.stringify(user).toLowerCase()
      return combinedString.includes(searchTerm)
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
        <S.Button active={filter === 'ALL'} onClick={() => handleFilterChange('ALL')}>All Employees</S.Button>
        <S.Button active={filter === 'ACTIVE'} onClick={() => handleFilterChange('ACTIVE')}>Active Employees</S.Button>
        <S.Button active={filter === 'INACTIVE'} onClick={() => handleFilterChange('INACTIVE')}>Inactive Employees</S.Button>
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

export default Employees