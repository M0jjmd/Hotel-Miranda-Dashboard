import { useEffect, useState } from "react"
import GuestList from '../components/GuestList.jsx'

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('../guestList.json')
            .then(response => response.json())
            .then(data => {
                setBookings(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching bookings data:', error)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <GuestList bookings={bookings} />
        </div>
    )
}

export default Bookings