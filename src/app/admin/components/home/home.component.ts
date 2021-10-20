import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { TeacherService } from '../../services/teacher.service';
import { Student } from '../../student-model';
import { Teacher } from '../../teacher-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  newItem: boolean = false;
  createStudent: boolean = false;
  createTeacher: boolean = false;
  selectedButton: string = 'student';
  selectButtonOptions = [
    { label: 'Student', value: 'student', icon: 'pi pi-users' },
    { label: 'Teacher', value: 'teacher', icon: 'pi pi-user-edit' },
  ];
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService
  ) {}
  students: Student[] = [];
  teachers: Teacher[] = [];
  ngOnInit(): void {
    this.getStudents();
    this.getTeachers();
  }
  getStudents() {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }
  getTeachers() {
    this.teacherService.getTeachers().subscribe((data: Teacher[]) => {
      this.teachers = data;
    });
  }
  addNew() {
    this.selectedButton === 'student'
      ? (this.createStudent = true)
      : (this.createTeacher = true);
  }
  logout() {
    this.studentService.logout();
  }
}
