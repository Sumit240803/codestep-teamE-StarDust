import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/Landing';
// import Exchange from './pages/Dashboard/Exchange';
// import Layout from './pages/Dashboard/layout';
// import Airdrop from './pages/Dashboard/Airdrop';
// import InviteFriends from './pages/Dashboard/InviteFriends';
// import RewardsList from './pages/Dashboard/RewardsList';
// import MineCard from './pages/Dashboard/MineCard';
// import ProfileTabs from './pages/Dashboard/ProfilePage';
import RegisterScreen from './pages/Register';
import { lazy } from 'react';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotFound from './pages/Error/404/index';
import { Navigate } from 'react-router-dom';
import UnAuthorized from './pages/Error/UnAuthorized';


const Layout = lazy(()=>import('./pages/Dashboard/layout'))
const Exchange = lazy(()=>import('./pages/Dashboard/Exchange'))
const Airdrop = lazy(()=>import('./pages/Dashboard/Airdrop'))
const InviteFriends = lazy(()=>import('./pages/Dashboard/InviteFriends'))
const RewardsList = lazy(()=>import('./pages/Dashboard/RewardsList'))
const MineCard = lazy(()=>import('./pages/Dashboard/MineCard'))
const ProfileTabs = lazy(()=>import('./pages/Dashboard/ProfilePage'))
const Games = lazy(()=>import("./pages/Dashboard/Games"))
export default function AppRoutes() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Landing />,
        },
        {
            path: '/register',
            element: <RegisterScreen/>
        },
        {
            path: '/unauthorized',
            element: <UnAuthorized/>
        },
        {
            path: '/dashboard',
            element: (
                <ProtectedRoutes>
                    <Layout />
                </ProtectedRoutes>
            ),
            children: [
                {
                    index: true,
                    element: <Exchange/>,
                },
                {
                    path: 'exchange',
                    element: <Exchange />,
                },
                {
                    path: 'airdrop',
                    element: <Airdrop />,
                },
                {
                    path: 'friends',
                    element: <InviteFriends />,
                },
                {
                    path: 'gifts',
                    element: <RewardsList />,
                },
                {
                    path: 'games',
                    element: <Games />,
                },
                {
                    path: 'mine-cards',
                    element: <MineCard />,
                },
                {
                    path: 'profile',
                    element: <ProfileTabs/>
                },
                // Add a catch-all route at the end
                {
                    path: '*',
                    element: <Navigate to="/notfound" replace />
                },
            ],
        },
        // Global wildcard route for all other undefined paths
        {
            path: '*',
            element: <NotFound/>
        },
        
    ]);

    return <RouterProvider router={router} />
}