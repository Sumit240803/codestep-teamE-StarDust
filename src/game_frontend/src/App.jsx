import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes  from './Routes';
import { AuthProvider } from './hooks/useAuth';
function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
         <AppRoutes/>
    </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
