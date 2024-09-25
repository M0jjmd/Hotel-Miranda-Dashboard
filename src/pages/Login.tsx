import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as S from '../styles/loginStyles'
import { Toast } from '../components/ToastNotification'
import { AuthentificateUser } from '../features/login/authenticateUserThunk'
import { useAuth } from '../context/AuthContext'
import { AppDispatch, RootState } from '../app/store'

const Login = () => {
  const loginDispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const loginDataSelect = (state: RootState) => state.loginUser
  const { isAuthentificated, token, name, email, id } = useSelector(loginDataSelect)
  const { dispatch } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLocalError('')

    if (!username || !password) {
      setLocalError('Please enter both username and password')
      Toast({ message: 'Please enter both username and password', success: false })
      return
    }

    try {
      const response = await loginDispatch(AuthentificateUser({ username, password })).unwrap()

      if (AuthentificateUser.rejected.match(response)) {
        const message = typeof response.payload === 'string' ? response.payload : 'Invalid username or password'
        setLocalError(message)
        Toast({ message, success: false })
      }

    } catch (error) {
      const message = 'An unexpected error occurred. Please try again.'
      setLocalError(message)
      Toast({ message, success: false })
      console.error('Login failed:', error)
    }
  }

  useEffect(() => {
    if (isAuthentificated) {
      Toast({ message: `¡Bienvenido, ${name}!`, success: true })
      localStorage.setItem('isAuthentificated', 'true')
      localStorage.setItem('token', token)
      localStorage.setItem('name', name)
      localStorage.setItem('email', email)
      localStorage.setItem('id', id)

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
        <S.LoginTitle>Login<br />johndoe<br />miContraseñaSegura</S.LoginTitle>
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