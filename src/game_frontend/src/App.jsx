import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes  from './Routes';
import { AuthProvider } from './hooks/useAuth';
import { JoyRideProvider } from './context/JoyrideContext';
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <JoyRideProvider>
         <AppRoutes/>
        </JoyRideProvider>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
