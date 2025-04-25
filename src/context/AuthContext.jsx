
import { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

// Create the AuthContext
const AuthContext = createContext();

// The AuthProvider component
export const AuthProvider = ({ children }) => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkLoggedIn = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Error checking authentication state:", err);
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Register a new user
  const register = async (email, password, name) => {
    setLoading(true);
    setError(null);
    
    try {
      // This would be an API call in a real app
      // For now, we'll mock the behavior
      console.log("Registering user with:", { email, password, name });
      
      // Mock a successful registration
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        preferences: null,
        userType: null,
        createdAt: new Date().toISOString()
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Registration successful",
        description: "Welcome! Let's set up your preferences now.",
      });
      
      return mockUser;
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || 'Registration failed. Please try again.');
      toast({
        title: "Registration failed",
        description: err.message || 'Something went wrong. Please try again.',
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Login a user
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // This would be an API call in a real app
      console.log("Logging in user with:", { email, password });
      
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // Mock a successful login
      // In a real app, this would verify credentials with a backend
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0], // Mock name from email
        preferences: {
          userType: Math.random() > 0.5 ? 'seeker' : 'owner',
        },
        createdAt: new Date().toISOString()
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      return mockUser;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || 'Login failed. Please check your credentials and try again.');
      toast({
        title: "Login failed",
        description: err.message || 'Invalid email or password.',
        variant: "destructive",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout a user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Logged out",
      description: "You've been logged out successfully.",
    });
  };
  
  // Update user information
  const updateUserInfo = (updatedInfo) => {
    try {
      const updatedUser = { ...user, ...updatedInfo };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile updated",
        description: "Your information has been updated successfully.",
      });
      
      return updatedUser;
    } catch (err) {
      console.error("Error updating user info:", err);
      toast({
        title: "Update failed",
        description: "Failed to update your information.",
        variant: "destructive",
      });
      throw err;
    }
  };
  
  // Update user preferences
  const updatePreferences = (preferences) => {
    try {
      const updatedUser = { 
        ...user, 
        preferences: { 
          ...user?.preferences, 
          ...preferences 
        } 
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Preferences updated",
        description: "Your preferences have been saved successfully.",
      });
      
      return updatedUser;
    } catch (err) {
      console.error("Error updating preferences:", err);
      toast({
        title: "Update failed",
        description: "Failed to update your preferences.",
        variant: "destructive",
      });
      throw err;
    }
  };
  
  // Set user type (seeker or owner)
  const setUserType = (userType) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to set your user type.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Update the user's preferences with the userType
      return updatePreferences({ userType });
    } catch (err) {
      console.error("Error setting user type:", err);
      toast({
        title: "Error",
        description: "Failed to update your user type.",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Google authentication (mock)
  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // This would integrate with Google OAuth in a real app
      console.log("Attempting Google login");
      
      // Mock a successful Google login
      setTimeout(() => {
        const mockGoogleUser = {
          id: Math.random().toString(36).substr(2, 9),
          email: "user@gmail.com",
          name: "Google User",
          avatar: "https://lh3.googleusercontent.com/a/default-user",
          preferences: null,
          userType: null,
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem('user', JSON.stringify(mockGoogleUser));
        setUser(mockGoogleUser);
        
        toast({
          title: "Google login successful",
          description: "Welcome to RoommateMatch!",
        });
        
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Google login error:", err);
      setError('Google login failed. Please try again.');
      toast({
        title: "Google login failed",
        description: "Unable to log in with Google. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
      throw err;
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    updateUserInfo,
    updatePreferences,
    setUserType,
    loginWithGoogle,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
