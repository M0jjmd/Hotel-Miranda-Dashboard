import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AuthentificateUser } from '../features/login/authenticateUserThunk'
import { useAuth } from '../context/AuthContext'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
`

const LoginTitle = styled.h1`
  margin-bottom: 1.1rem;
  color: #333;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
`

const InputField = styled.input`
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`

const SubmitButton = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 5px;
  background-color: grey;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, name, email } = useSelector(state => state.loginUser)
  const { dispatch: authDispatch } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLocalError('')

    try {
      const actionResult = await dispatch(AuthentificateUser({ username, password })).unwrap();
    } catch (error) {
      setLocalError(error.message || 'Invalid username or password')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', isAuthenticated)
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)

      authDispatch({
        type: 'LOGIN',
        payload: { name, email }
      })

      navigate('/dashboard')
    }
  }, [isAuthenticated, name, email, authDispatch, navigate])


  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <LoginTitle>Login<br />johndoe<br />password123</LoginTitle>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          data-cy="username"
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-cy="password"
        />
        {localError && <ErrorMessage>{localError}</ErrorMessage>}
        <SubmitButton type="submit" data-cy="submit">Login</SubmitButton>
      </LoginForm>
    </LoginContainer>
  )
}

export default Login