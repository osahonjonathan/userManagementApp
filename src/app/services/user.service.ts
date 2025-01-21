import { Injectable } from '@angular/core';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = [
    {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      role: 'Admin',
      department: 'HR',
      application: 100,
    },
    {
      id: 2,
      name: 'Bob',
      email: 'bob@example.com',
      role: 'Editor',
      department: 'Marketing',
      application: 70,
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'charlie@example.com',
      role: 'Viewer',
      department: 'Finance',
      application: 90,
    },
    {
      id: 4,
      name: 'David',
      email: 'david@example.com',
      role: 'Admin',
      department: 'HR',
      application: 60,
    },
    {
      id: 5,
      name: 'Eve',
      email: 'eve@example.com',
      role: 'Editor',
      department: 'IT',
      application: 80,
    },
    {
      id: 6,
      name: 'Frank',
      email: 'frank@example.com',
      role: 'Viewer',
      department: 'Finance',
      application: 50,
    },
    {
      id: 7,
      name: 'Grace',
      email: 'grace@example.com',
      role: 'Admin',
      department: 'Operations',
      application: 80,
    },
    {
      id: 8,
      name: 'Hank',
      email: 'hank@example.com',
      role: 'Editor',
      department: 'IT',
      application: 70,
    },
    {
      id: 9,
      name: 'Ivy',
      email: 'ivy@example.com',
      role: 'Viewer',
      department: 'Marketing',
      application: 40,
    },
    {
      id: 10,
      name: 'Jack',
      email: 'jack@example.com',
      role: 'Admin',
      department: 'Operations',
      application: 90,
    },
  ];

  private nextId!: number;

  getAllUsers(): IUser[] {
    return [...this.users];
  }

  addUser(user: Partial<IUser>): void {
    this.nextId = this.users.length + 1;
    const newUser = { ...user, id: this.nextId } as IUser;
    this.users.push(newUser);
  }

  updateUser(id: number, updatedUser: Partial<IUser>): void {
    console.log('Before Update:', this.users);
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        ...updatedUser,
      } as IUser;
      console.log('Updated User:', this.users[index]);
    } else {
      console.log('User not found with id:', id);
    }
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  getToken(): string | null {
    return localStorage.getItem('username');
   
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
