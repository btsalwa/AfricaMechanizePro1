import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['/api/auth/user'],
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
    isInitialized,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useLogin() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (loginData) => {
      return await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/auth/user'], data.user);
      toast({
        title: "Welcome back!",
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useRegister() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (registerData) => {
      return await apiRequest('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(registerData),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Registration Successful!",
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      return await apiRequest('/api/auth/logout', {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/auth/user'], null);
      queryClient.clear();
      toast({
        title: "Logged out successfully",
        description: "See you again soon!",
      });
    },
    onError: (error) => {
      // Even if logout fails on server, clear client state
      queryClient.setQueryData(['/api/auth/user'], null);
      queryClient.clear();
      toast({
        title: "Logged out",
        description: "You have been logged out.",
      });
    },
  });
}

export function useForgotPassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (email) => {
      return await apiRequest('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Reset Link Sent",
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useResetPassword() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (resetData) => {
      return await apiRequest('/api/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(resetData),
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Password Reset Successful",
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Reset Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (profileData) => {
      return await apiRequest('/api/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['/api/auth/user'], data.user);
      toast({
        title: "Profile Updated",
        description: data.message,
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}