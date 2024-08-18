import { useEffect, useState } from "react"
import ContactsView from "../components/ContactsView"

const Contacts = () => {
    const [contactsView, setContactsView] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('../hotel-messages.json')
            .then(response => response.json())
            .then(data => {
                setContactsView(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching hotel-messages data:', error)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div>
                <ContactsView contactsView={contactsView} />
            </div>
        </>
    )
}

export default Contacts