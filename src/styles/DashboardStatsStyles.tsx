import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
`

export const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }
`

export const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #007bff;
`

export const Label = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
`

export const Value = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
`