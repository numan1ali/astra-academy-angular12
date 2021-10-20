import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/admin/student-model';
// import { Student } from 'src/app/admin/student-model';
import { User } from 'src/app/admin/user-model';
import { StudentServiceService } from '../../student-service.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
})
export class StudentViewComponent implements OnInit {
  newItem: boolean = false;
  loggedInStudent!: Student;
  user!: User;
  constructor(private studentService: StudentServiceService) {}
  students: Student[] = [];
  studentDialog: boolean = false;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getStudents();
    this.getStudentbyID();
  }
  getStudents() {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }
  getStudentbyID() {
    this.studentService
      .getStudentbyID(this.user.userId)
      .subscribe((response) => {
        this.loggedInStudent = response as Student;
      });
  }
  logout() {
    this.studentService.logout();
  }
  hideDialog() {
    this.studentDialog = false;
  }
}
