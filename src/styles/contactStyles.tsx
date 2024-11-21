import styled from "styled-components";
import { colors, fontSize } from "./tablesForm"

export const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 0.8rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 600px;
`

export const PopupContent = styled.div`
  h3 {
    font-size: ${fontSize.large};
    margin-bottom: 1rem;
    color: ${colors.primary};
  }

  p {
    font-size: ${fontSize.medium};
    color: ${colors.text};
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`

export const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  background-color: ${colors.danger};
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: ${fontSize.medium};
  cursor: pointer;

  &:hover {
    background-color: ${colors.dangerHover};
  }
`

export const QuickView = styled.div`
  margin-bottom: 1.5rem;

  h2 {
    font-size: ${fontSize.large};
    color: ${colors.text};
    margin-bottom: 0.8rem;
  }
`

export const MessagePreview = styled.div`
  padding: 1rem;
  background: ${colors.light};
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 0.8rem;

  &:hover {
    background-color: ${colors.secondaryHover};
  }

  strong {
    color: ${colors.primary};
  }
`

export const ActionButton = styled.button`
  background-color: ${colors.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  font-size: ${fontSize.medium};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.primaryHover};
  }

  &:disabled {
    background-color: ${colors.light};
    color: ${colors.text};
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 4px ${colors.primaryHover};
  }
`