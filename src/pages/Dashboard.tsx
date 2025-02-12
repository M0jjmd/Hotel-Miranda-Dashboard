import * as S from '../styles/dashboardStyles'
import DashboardStats from '../components/DashboardStats'
import LatestMessages from '../components/LatestMessages'

const Dashboard = () => {
    return (
        <S.DashboardContent>
            <S.TopSection>
                <DashboardStats />
            </S.TopSection>
            <S.FullWidthSection>
                <LatestMessages />
            </S.FullWidthSection>
        </S.DashboardContent>
    )
}

export default Dashboard