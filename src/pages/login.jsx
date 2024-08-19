import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {

  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('../users.json')
      const data = await response.json()

      const user = data.data.find(
        (user) => user.user.username === username && user.user.password === password
      )

      if (user) {
        alert('Login successful!')
        localStorage.setItem('authToken', user.authToken)
        localStorage.setItem('name', user.user.username)
        localStorage.setItem('email', user.user.email)
        navigate('/dashboard')
        setError('')
      } else {
        setError('Invalid username or password')
      }

    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <LoginContainer>

      <LoginForm onSubmit={handleLogin}>
        <LoginTitle>Login<br />johndoe<br />password123</LoginTitle>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SubmitButton type="submit">Login</SubmitButton>
      </LoginForm>
    </LoginContainer>
  )
}

export default Login