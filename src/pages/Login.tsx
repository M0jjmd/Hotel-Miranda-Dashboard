import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { AuthentificateUser } from '../features/login/authenticateUserThunk'
import { useAuth } from '../context/AuthContext'
import { AppDispatch, RootState } from '../app/store'

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

interface SubmitButtonProps {
  error: boolean;
}

const SubmitButton = styled.button<SubmitButtonProps>`
  padding: 1rem;
  border: none;
  border-radius: 5px;
  background-color: ${props => (props.error ? '#dc3545' : 'grey')};
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => (props.error ? '#dc3545' : '#45a049')};
  }
`

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`

const Login = () => {
  const loginDispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const loginDataSelect = (state: RootState) => state.loginUser
  const { isAuthentificated, name, email } = useSelector(loginDataSelect)
  const { dispatch } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    try {
      await loginDispatch(AuthentificateUser({ username, password })).unwrap()
    } catch (error) {
      setLocalError('Invalid username or password')
    }
  }

  useEffect(() => {
    if (isAuthentificated) {
      localStorage.setItem('isAuthentificated', JSON.stringify(isAuthentificated))
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)

      dispatch({
        type: 'LOGIN',
        payload: { name, email }
      })

      navigate('/dashboard')
    }
  }, [isAuthentificated, name, email, dispatch, navigate])


  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin} data-testid="login-form">
        <LoginTitle>Login<br />johndoe<br />password123</LoginTitle>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          data-testid="username-input"
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password-input"
        />
        {localError && <ErrorMessage data-testid="error-message">{localError}</ErrorMessage>}
        <SubmitButton type="submit" data-testid="submit-button" error={!!localError}>Login</SubmitButton>
      </LoginForm>
    </LoginContainer>
  )
}

export default Login