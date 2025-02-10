import { useAppSelector } from '../app/store'
import * as S from "../styles/LatestMessagesStyles"

const LatestMessages: React.FC = () => {
  const messages = useAppSelector((state) => state.contacts.data)
  const latestMessages = messages.slice(-3)

  return (
    <S.MessagesContainer>
      <h3>Últimos Mensajes</h3>
      {latestMessages.map((message) => (
        <S.MessageItem key={message._id}>
          <div className="message-content">{message.subject}</div>
          <div className="message-date">{new Date(message.date).toLocaleString()}</div>
        </S.MessageItem>
      ))}
    </S.MessagesContainer>
  )
}

export default LatestMessages