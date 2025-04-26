import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const NotFound = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const redirectPath = isAuthenticated ? '/dashboard' : '/';

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectPath);
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, redirectPath]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4"
    style={{
        backgroundImage: 'url("/assets/images/space-exchange-bg.webp")',
        width: '100vw',    
        height: '100vh',      
        backgroundSize: 'cover', 
      }}>
      <div className="max-w-lg w-full text-center">
        
        
        <h1 className="mb-4 text-9xl font-bold font-coin text-white">404</h1>
        
        <h2 className="mb-4 text-3xl font-semibold text-gray-100">
          Page Not Found
        </h2>
        
        <p className="mb-8 text-lg text-gray-100">
          Sorry, the page you are looking for doesn't exist or you don't have permission to access it. 
          You will be redirected to the {isAuthenticated ? 'dashboard' : 'homepage'} in 5 seconds.
        </p>

        <Button 
          onClick={() => navigate(redirectPath)}
         
        >
          Go to {isAuthenticated ? 'Dashboard' : 'Homepage'}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;