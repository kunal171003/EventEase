import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  name: string;
  email: string;
  avatar: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}