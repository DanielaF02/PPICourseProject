import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isLogged = new BehaviorSubject<boolean>(false);

  private registeredUsers: User[] = [];
  private http = inject(HttpClient);

  getUsers(): User[] {
    return this.registeredUsers;
  }

  setUsers(users: User[]) {
    this.registeredUsers = users;
  }

  getUsersFromFile(): Observable<User[]> {
    return this.http.get<User[]>('assets/data/users.json');
  }

  register(user: User) {
    this.registeredUsers.push(user);
  }
}
