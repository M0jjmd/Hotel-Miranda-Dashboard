import React from 'react'
import { useAppSelector } from '../app/store'
import styled from 'styled-components'

const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
`

const MessageItem = styled.div`
  padding: 1rem;
  background-color: #fff;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:last-child {
    margin-bottom: 0;
  }

  .message-content {
    font-size: 1rem;
    color: #333;
  }

  .message-date {
    font-size: 0.875rem;
    color: #888;
    margin-top: 0.5rem;
  }
`

const LatestMessages: React.FC = () => {
    const messages = useAppSelector((state) => state.contacts.data)

    // Obtener los 3 últimos mensajes
    const latestMessages = messages.slice(-3)

    return (
        <MessagesContainer>
            <h3>Últimos Mensajes</h3>
            {latestMessages.map((message) => (
                <MessageItem key={message._id}>
                    <div className="message-content">{message.subject}</div>
                    <div className="message-date">{new Date(message.date).toLocaleString()}</div>
                </MessageItem>
            ))}
        </MessagesContainer>
    )
}

export default LatestMessages