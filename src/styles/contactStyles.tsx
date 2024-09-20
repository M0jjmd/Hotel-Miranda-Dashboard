import styled from 'styled-components'

export const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

export const PopupContent = styled.div`
  h3 {
    margin: 0 0 10px;
  }
`

export const CloseButton = styled.button`
  margin-top: 10px;
`

export const QuickView = styled.div`
  margin-bottom: 20px;
  h2 {
    margin-bottom: 10px;
  }
`

export const MessagePreview = styled.div`
  cursor: pointer;
  padding: 10px;
  background: #f9f9f9;
  margin-bottom: 5px;
  border: 1px solid #ddd;
`

export const ArchiveButton = styled.button`
  padding: 5px 10px;
  background: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
`

export const NewMessageContainer = styled.div`
  margin-top: 30px;
  h3 {
    margin-bottom: 20px;
  }
`

export const ActionButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`