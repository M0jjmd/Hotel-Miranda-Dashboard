import DashboardStats from '../components/DashboardStats'
import Calendar from '../components/Calendar'
import * as S from '../styles/dashboardStyles'

const Dashboard = () => {
    return (
        <>
            <S.DashboardContent>
                <div>Dashboard</div>
                <DashboardStats />
                <Calendar />
            </S.DashboardContent>
        </>
    )
}

export default Dashboard