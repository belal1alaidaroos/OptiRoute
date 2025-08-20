import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users data
const mockUsers = {
  admin: {
    id: 1,
    username: 'admin',
    email: 'admin@optiroute360.com',
    first_name: 'Super',
    last_name: 'Admin',
    role: 'SuperAdmin',
    tenant: { id: 1, name: 'OptiRoute360 HQ' },
    avatar_url: null,
    is_active: true
  },
  manager: {
    id: 2,
    username: 'manager',
    email: 'manager@optiroute360.com',
    first_name: 'Fleet',
    last_name: 'Manager',
    role: 'Manager',
    tenant: { id: 1, name: 'OptiRoute360 HQ' },
    avatar_url: null,
    is_active: true
  },
  dispatcher: {
    id: 3,
    username: 'dispatcher',
    email: 'dispatcher@optiroute360.com',
    first_name: 'Operations',
    last_name: 'Dispatcher',
    role: 'Dispatcher',
    tenant: { id: 1, name: 'OptiRoute360 HQ' },
    avatar_url: null,
    is_active: true
  },
  driver: {
    id: 4,
    username: 'driver',
    email: 'driver@optiroute360.com',
    first_name: 'John',
    last_name: 'Driver',
    role: 'Driver',
    tenant: { id: 1, name: 'OptiRoute360 HQ' },
    avatar_url: null,
    is_active: true
  }
};

const mockCredentials = {
  admin: 'admin123',
  manager: 'manager123',
  dispatcher: 'dispatcher123',
  driver: 'driver123'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('optiroute360_user');
    const storedToken = localStorage.getItem('optiroute360_token');
    
    if (storedUser && storedToken) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('optiroute360_user');
        localStorage.removeItem('optiroute360_token');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials
      if (mockUsers[username] && mockCredentials[username] === password) {
        const userData = mockUsers[username];
        const mockToken = `mock_token_${username}_${Date.now()}`;
        
        // Store authentication data
        localStorage.setItem('optiroute360_user', JSON.stringify(userData));
        localStorage.setItem('optiroute360_token', mockToken);
        
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true, user: userData, token: mockToken };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed. Please check your credentials.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('optiroute360_user');
    localStorage.removeItem('optiroute360_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const hasPermission = (requiredRole) => {
    if (!user || !user.role) return false;
    
    const roleHierarchy = {
      'SuperAdmin': 5,
      'Admin': 4,
      'Manager': 3,
      'Dispatcher': 2,
      'Driver': 1
    };
    
    const userLevel = roleHierarchy[user.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...profileData };
      localStorage.setItem('optiroute360_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    hasPermission,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

