export const validateAuthToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found. Please log in.');
    }

    const response = await fetch('http://localhost:8080/api/auth/validate-token', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Invalid token. Please log in again.');
    }

    return token
};
