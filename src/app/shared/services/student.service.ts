import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// import { Student } from '../student-model';
// import { User } from '../user-model';
import { Router } from '@angular/router';
import { Student } from 'src/app/admin/student-model';
import { Teacher } from 'src/app/admin/teacher-model';
import { User } from 'src/app/admin/user-model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl = 'https://6166935013aa1d00170a6588.mockapi.io';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private router: Router) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      `${this.baseUrl}/student`,
      this.httpOptions
    );
  }
  updateStudent(studentId: string, body: Student): Observable<Student> {
    return this.http.put<Student>(
      `${this.baseUrl}/student/${studentId}`,
      body,
      this.httpOptions
    );
  }

  createStudent(body: Student): Observable<Student> {
    return this.http.post<Student>(
      `${this.baseUrl}/student`,
      body,
      this.httpOptions
    );
  }
  createStudentCredentials(body: Student | Teacher): Observable<User> {
    return this.http.post<User>(
      `${this.baseUrl}/users`,
      body,
      this.httpOptions
    );
  }
  deleteStudent(studentId: string): Observable<Student> {
    return this.http.delete<Student>(`${this.baseUrl}/student/${studentId}`);
  }
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
