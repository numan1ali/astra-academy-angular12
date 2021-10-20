import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Student } from '../student-model';
import { User } from '../user-model';
import { Router } from '@angular/router';
import { Teacher } from '../teacher-model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private router: Router) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      'https://6166935013aa1d00170a6588.mockapi.io/student',
      this.httpOptions
    );
  }
  updateStudent(studentId: string, body: Student): Observable<Student> {
    return this.http.put<Student>(
      `https://6166935013aa1d00170a6588.mockapi.io/student/${studentId}`,
      body,
      this.httpOptions
    );
  }

  createStudent(body: Student): Observable<Student> {
    return this.http.post<Student>(
      `https://6166935013aa1d00170a6588.mockapi.io/student`,
      body,
      this.httpOptions
    );
  }
  createStudentCredentials(body: User): Observable<User> {
    return this.http.post<User>(
      `https://6166935013aa1d00170a6588.mockapi.io/users`,
      body,
      this.httpOptions
    );
  }
  deleteStudent(studentId: string): Observable<Student> {
    return this.http.delete<Student>(
      `https://6166935013aa1d00170a6588.mockapi.io/student/${studentId}`
    );
  }
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
