import { useEffect, useState } from "react"
import RoomsList from "../components/RoomsList"

const Rooms = () => {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('../rooms.json')
            .then(response => response.json())
            .then(data => {
                setRooms(data)
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
                <RoomsList rooms={rooms} />
            </div>
        </>
    )
}

export default Rooms