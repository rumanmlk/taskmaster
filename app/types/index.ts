import type { Priority as PrismaPriority, Task as PrismaTask, User as PrismaUser } from '@prisma/client';

// Re-export Priority from Prisma
export type Priority = PrismaPriority;

// Extend Prisma's Task type to include optional user relation
export interface Task extends PrismaTask {
  user?: {
    id: string;
    email: string;
    name: string | null;
  };
}

// Extend Prisma's User type to include tasks relation
export interface User extends PrismaUser {
  tasks?: Task[];
}

// Request types for creating data
export interface CreateTaskData {
  title: string;
  description?: string | null;
  priority: Priority;
  dueDate?: string | null;
  userId: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}