import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'donor' | 'hospital' | 'organizer';
  bloodType?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('aurora_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Mock login function (replace with actual API calls in production)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data (replace with actual authentication logic)
      if (email === 'admin@aurora.ai' && password === 'admin123') {
        const userData: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@aurora.ai',
          role: 'admin'
        };
        setUser(userData);
        localStorage.setItem('aurora_user', JSON.stringify(userData));
      } else if (email === 'donor@aurora.ai' && password === 'donor123') {
        const userData: User = {
          id: '2',
          name: 'John Donor',
          email: 'donor@aurora.ai',
          role: 'donor',
          bloodType: 'O+'
        };
        setUser(userData);
        localStorage.setItem('aurora_user', JSON.stringify(userData));
      } else if (email === 'hospital@aurora.ai' && password === 'hospital123') {
        const userData: User = {
          id: '3',
          name: 'City Hospital',
          email: 'hospital@aurora.ai',
          role: 'hospital'
        };
        setUser(userData);
        localStorage.setItem('aurora_user', JSON.stringify(userData));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send the user data to your API
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: userData.name || 'New User',
        email: userData.email || '',
        role: userData.role || 'donor',
        bloodType: userData.bloodType
      };
      
      setUser(newUser);
      localStorage.setItem('aurora_user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aurora_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};