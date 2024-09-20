import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
`

export const LoginTitle = styled.h1`
  margin-bottom: 1.1rem;
  color: #333;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 1.1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
`

export const InputField = styled.input`
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`

export interface SubmitButtonProps {
    error: boolean;
}

export const SubmitButton = styled.button<SubmitButtonProps>`
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

export const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
`