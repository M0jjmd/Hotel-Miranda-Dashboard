import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { AuthProvider } from '../context/AuthContext'
import store from '../app/store'
import Login from '../pages/Login'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

test('El botón cambia a color rojo cuando se ingresa usuario y contraseña incorrectas', async () => {
    render(
        <Provider store={store}>
            <AuthProvider>
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                    </Routes>
                </MemoryRouter>
            </AuthProvider>
        </Provider>
    )

    const usernameInput = screen.getByTestId('username-input')
    const passwordInput = screen.getByTestId('password-input')
    const loginButton = screen.getByTestId('submit-button')

    fireEvent.change(usernameInput, { target: { value: 'wronguser' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.click(loginButton)

    await screen.findByTestId('error-message')

    expect(loginButton).toHaveStyle('background-color: #dc3545')
})