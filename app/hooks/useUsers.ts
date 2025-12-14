import type { User } from '@/app/types';
import { useEffect, useState } from 'react';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        
        if (!res.ok) {
          console.error('API Error:', res.status, res.statusText);
          return;
        }

        const text = await res.text();
        if (!text) {
          console.log('No users found, starting with empty array');
          setUsers([]);
          return;
        }

        const data = JSON.parse(text);
        setUsers(data);
        if (data.length > 0) {
          setSelectedUser(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  const createUser = async (userData: CreateUserData) => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      if (!res.ok) {
        console.error('Failed to create user:', res.status);
        return;
      }
      
      const user = await res.json();
      setUsers(prevUsers => [...prevUsers, user]);
      setSelectedUser(user.id);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return { users, selectedUser, setSelectedUser, createUser };
}