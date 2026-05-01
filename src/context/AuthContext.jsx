import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('suncart_mock_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    const mockUser = {
      id: 'mock-id-123',
      name: 'Summer Shopper',
      email: 'hello@summer.store',
      image: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    };
    setUser(mockUser);
    localStorage.setItem('suncart_mock_session', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setUser(null);
    localStorage.removeItem('suncart_mock_session');
    setIsLoading(false);
  };

  const updateUser = async (data) => {
    if (!user) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('suncart_mock_session', JSON.stringify(updatedUser));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSession must be used within an AuthProvider');
  }
  return context;
}
