import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { Student } from 'src/app/admin/student-model';
import { Router } from '@angular/router';
import { Teacher } from 'src/app/admin/teacher-model';
// import { Student } from '../student-model';
// import { User } from '../user-model';
// import { Router } from '@angular/router';
// import { Teacher } from '../teacher-model';

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
  getAssignedStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(
      'https://6166935013aa1d00170a6588.mockapi.io/student',
      this.httpOptions
    );
  }
  getTechers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(
      `https://6166935013aa1d00170a6588.mockapi.io/teachers`
    );
  }
  getTeacherbyID(userID: string): Observable<Teacher | undefined> {
    return this.getTechers().pipe(
      map((teacher: Teacher[]) =>
        teacher.find((value: Teacher) => value.userId === userID)
      )
    );
  }
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
