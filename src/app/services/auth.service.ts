import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../admin/user-model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  isLogin: boolean = false;
  loggedInUser!: User;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  getAllUsersData(): Observable<User[]> {
    return this.http.get<User[]>(
      'https://6166935013aa1d00170a6588.mockapi.io/users',
      this.httpOptions
    );
  }
  authenticatUser(email?: string, password?: string): Observable<boolean> {
    return this.getAllUsersData().pipe(
      switchMap((data: any[]): any => {
        const user = data.find((user) => user.email === email);
        if (user && user.password === password) {
          this.setToken('abcdefghijklmnopqrstuvwxvz');
          this.setUser(user);
          this.loggedInUser = user;
          this.isLogin = true;

          return of(true);
        } else return of(false);
      })
    ) as Observable<boolean>;
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUser(): string | null {
    return localStorage.getItem('user');
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}
