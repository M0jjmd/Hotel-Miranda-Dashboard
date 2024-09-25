import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastWrapper = styled.div<{ success?: boolean }>`
  background-color: ${({ success }) => (success ? '#28a745' : '#dc3545')};
  color: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
`

interface ToastProps {
    message: string
    success?: boolean
}

const Toast: React.FC<ToastProps> = ({ message, success }) => {
    toast(<ToastWrapper success={success}>{message}</ToastWrapper>, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })

    return null
}

const Toasty: React.FC = () => {
    return <ToastContainer />
};

export { Toast, Toasty }
