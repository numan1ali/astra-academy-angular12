import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Teacher } from '../teacher-model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient, private router: Router) {}

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(
      'https://6166935013aa1d00170a6588.mockapi.io/teachers',
      this.httpOptions
    );
  }
  updateTeacher(teacherId: string, body: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(
      `https://6166935013aa1d00170a6588.mockapi.io/teachers/${teacherId}`,
      body,
      this.httpOptions
    );
  }

  createTeacher(body: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(
      `https://6166935013aa1d00170a6588.mockapi.io/teachers`,
      body,
      this.httpOptions
    );
  }
  deleteTeacher(teacherId: string): Observable<Teacher> {
    return this.http.delete<Teacher>(
      `https://6166935013aa1d00170a6588.mockapi.io/teachers/${teacherId}`
    );
  }
}
