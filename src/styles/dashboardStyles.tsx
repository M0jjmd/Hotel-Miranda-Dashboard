// import styled from "styled-components"

// export const DashboardContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
// `

// export const TopSection = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: flex-start;
//   gap: 2rem;
// `

// export const FullWidthSection = styled.div`
//   width: 100%;
// `
import styled from "styled-components"

export const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra horizontalmente */
  justify-content: center; /* Centra verticalmente */
  gap: 2rem;
  min-height: 100vh; /* Ocupar al menos toda la pantalla */
  padding: 2rem 0; /* Espaciado arriba y abajo */
`

export const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; /* Centra los elementos */
  align-items: center; /* Centra verticalmente */
  gap: 2rem;
  width: 100%;
  max-width: 1200px; /* Ajusta el ancho máximo si es necesario */
`

export const FullWidthSection = styled.div`
  width: 100%;
  max-width: 1200px; /* Para que no sea demasiado ancho */
  display: flex;
  justify-content: center; /* Centra horizontalmente */
`