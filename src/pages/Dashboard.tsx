import DashboardStats from '../components/DashboardStats'
import InteractiveCalendar from '../components/InteractiveCalendar'
import LatestMessages from '../components/LatestMessages'
import * as S from '../styles/dashboardStyles'

const Dashboard = () => {
    return (
        <S.DashboardContent>
            <S.TopSection>
                <DashboardStats />
                <InteractiveCalendar />
            </S.TopSection>
            <S.FullWidthSection>
                <LatestMessages />
            </S.FullWidthSection>
        </S.DashboardContent>
    )
}

export default Dashboard