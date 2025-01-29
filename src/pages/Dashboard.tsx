import DashboardStats from '../components/DashboardStats'
import InteractiveCalendar from '../components/InteractiveCalendar'
import LatestMessages from '../components/LatestMessages'
import * as S from '../styles/dashboardStyles'
import styled from 'styled-components'

const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
`

const FullWidthSection = styled.div`
  width: 100%;
`

const Dashboard = () => {
    return (
        <DashboardContent>
            <TopSection>
                <DashboardStats />
                <InteractiveCalendar />
            </TopSection>
            <FullWidthSection>
                <LatestMessages />
            </FullWidthSection>
        </DashboardContent>
    )
}

export default Dashboard