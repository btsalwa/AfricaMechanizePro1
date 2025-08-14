import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation('/');
    }
  }, [isAuthenticated, setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Africa Mechanize</h1>
          <p className="text-green-600">Sustainable Agricultural Mechanization</p>
        </div>
        
        <LoginForm onSuccess={() => setLocation('/')} />
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Join our mission to transform African agriculture through innovative mechanization solutions.
          </p>
        </div>
      </div>
    </div>
  );
}