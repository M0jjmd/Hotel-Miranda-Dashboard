import DashboardStats from '../components/DashboardStats'
import InteractiveCalendar from '../components/InteractiveCalendar'
import * as S from '../styles/dashboardStyles'

const Dashboard = () => {
    return (
        <>
            <S.DashboardContent>
                <div>Dashboard</div>
                <DashboardStats />
                <InteractiveCalendar />
            </S.DashboardContent>
        </>
    )
}

export default Dashboard