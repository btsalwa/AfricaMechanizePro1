import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}

export function useLogout() {
  const logout = () => {
    window.location.href = '/api/auth/logout';
  };

  return { logout };
}

export function useForgotPassword() {
  const sendResetLink = async (email) => {
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to send reset link');
      }
      
      return { success: true };
    } catch (error) {
      throw new Error(error.message || 'Failed to send reset link');
    }
  };

  return { sendResetLink };
}

export function useLogin() {
  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      const data = await response.json();
      
      // Redirect to home or intended page
      window.location.href = '/';
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };

  return { login };
}

export function useRegister() {
  const register = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      
      const data = await response.json();
      
      // Redirect to login or verification page
      window.location.href = '/login';
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  return { register };
}

export function useResetPassword() {
  const resetPassword = async (data) => {
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Password reset failed');
      }
      
      const result = await response.json();
      
      // Redirect to login page on success
      window.location.href = '/login';
      
      return result;
    } catch (error) {
      throw new Error(error.message || 'Password reset failed');
    }
  };

  return { resetPassword };
}