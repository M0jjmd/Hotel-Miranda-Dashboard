describe('Login Component', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    const protectedRoutes = [
        '/bookings',
        '/users',
        '/rooms',
        '/contact',
        '/dashboard'
    ]

    protectedRoutes.forEach((route) => {
        it(`should redirect from ${route} to / if not authenticated`, () => {
            cy.visit(route, { failOnStatusCode: false })
            cy.url().should('include', '/')
        })
    })

    it('Should show an error with incorrect credentials', () => {
        cy.get('[data-testid="username-input"]').type('wronguser')
        cy.get('[data-testid="password-input"]').type('wrongpassword')
        cy.get('[data-testid="submit-button"]').click()
        cy.get('[data-testid="error-message"]').should('be.visible')
        cy.contains('Invalid username or password').should('be.visible')
    })

    it('Should log in successfully with correct credentials', () => {
        cy.get('[data-testid="username-input"]').type('johndoe')
        cy.get('[data-testid="password-input"]').type('password123')
        cy.get('[data-testid="submit-button"]').click()
        cy.url().should('include', '/dashboard')
    })
})