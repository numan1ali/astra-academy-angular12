import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../admin/student-model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
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
  getStudentbyID(userID: string): Observable<Student | undefined> {
    return this.getStudents().pipe(
      map((student: Student[]) =>
        student.find((value: Student) => value.userId === userID)
      )
    );
  }
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
