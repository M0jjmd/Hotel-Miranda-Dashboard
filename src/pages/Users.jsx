import { useEffect, useState } from "react"
import Employess from '../components/Employees.jsx'

const Users = () => {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('../employees.json')
            .then(response => response.json())
            .then(data => {
                setEmployees(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching employee data:', error)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div>
                <Employess employees={employees} />
            </div>
        </>
    )
}

export default Users