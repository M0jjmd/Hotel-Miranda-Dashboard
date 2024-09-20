import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as S from '../styles/loginStyles'
import { AuthentificateUser } from '../features/login/authenticateUserThunk'
import { useAuth } from '../context/AuthContext'
import { AppDispatch, RootState } from '../app/store'

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
      localStorage.setItem('isAuthentificated', 'true')
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
    <S.LoginContainer>
      <S.LoginForm onSubmit={handleLogin} data-testid="login-form">
        <S.LoginTitle>Login<br />johndoe<br />password123</S.LoginTitle>
        <S.InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          data-testid="username-input"
        />
        <S.InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-testid="password-input"
        />
        {localError && <S.ErrorMessage data-testid="error-message">{localError}</S.ErrorMessage>}
        <S.SubmitButton type="submit" data-testid="submit-button" error={!!localError}>Login</S.SubmitButton>
      </S.LoginForm>
    </S.LoginContainer>
  )
}

export default Login