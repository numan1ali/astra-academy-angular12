import { Component, OnInit } from '@angular/core';
import { filter, map, find } from 'rxjs/operators';
import { Student } from 'src/app/admin/student-model';
import { Teacher } from 'src/app/admin/teacher-model';
import { User } from 'src/app/admin/user-model';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
})
export class TeacherComponent implements OnInit {
  constructor(private teacherService: TeacherService) {}
  assignedStudents!: Student[];
  newItem: boolean = false;
  user!: User;
  loggedInTeacher!: Teacher;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.getTeacherbyID();
  }
  getAssignedStudents() {
    this.teacherService.getAssignedStudents().subscribe((result: Student[]) => {
      this.assignedStudents = result.filter((value: Student) => {
        return value.assignedTeacher === this.loggedInTeacher.name;
      });
    });
  }
  getTeacherbyID() {
    this.teacherService
      .getTeacherbyID(this.user.userId)
      .subscribe((teacher) => {
        this.loggedInTeacher = teacher as Teacher;
        this.getAssignedStudents();
      });
  }
  logout() {
    this.teacherService.logout();
  }
}
