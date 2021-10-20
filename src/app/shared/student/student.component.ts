import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Student } from 'src/app/admin/student-model';
import { User } from 'src/app/admin/user-model';
import { StudentService } from '../services/student.service';
import { MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class StudentComponent implements OnInit {
  studentDialog: boolean | undefined;
  editMode: boolean = false;
  loading: boolean = true;

  @Input('addStudent') set addStudent(value: boolean) {
    if (value) {
      this.openNew();
    }
  }
  @Input('studentsData') set studentsData(value: Student[]) {
    if (value) {
      this.students = value;
      this.loading = false;
    }
  }
  @Output('addStudentChange') addStudentChange = new EventEmitter();
  students: Student[] = [];
  user!: User;
  student!: Student;
  selectedStudents: Student[] = [];

  submitted: boolean = false;

  selectButtonOptions = [
    { label: 'Student', value: 'student', icon: 'pi pi-users' },
    { label: 'Teacher', value: 'teacher', icon: 'pi pi-user-edit' },
  ];

  selectedButton: string = 'student';
  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
  openNew() {
    this.student = {} as any;
    this.submitted = false;
    this.studentDialog = true;
  }

  editStudent(student: Student) {
    this.editMode = true;
    this.student = { ...student };
    this.studentDialog = true;
  }

  deleteStudent(student: Student) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + student.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.studentService
          .deleteStudent(student.studentId)
          .subscribe((deletedStudent: Student) => {
            this.students = this.students.filter(
              (student: Student) =>
                student.studentId !== deletedStudent.studentId
            );
            this.student = {} as any;
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Student Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.studentDialog = false;
    this.submitted = false;
    this.addStudentChange.emit(false);
  }

  saveStudent() {
    this.submitted = true;

    if (this.student.name.trim()) {
      if (this.editMode) {
        this.studentService
          .updateStudent(this.student.studentId, this.student)
          .subscribe((editedStudent: Student) => {
            this.students[this.findIndexById(editedStudent.studentId)] =
              editedStudent;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Student Updated',
              life: 3000,
            });
          });
      } else {
        this.studentService
          .createStudent(this.student)
          .subscribe((createdStudent: Student) => {
            this.students.push(createdStudent);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Student Created',
              life: 3000,
            });
          });
      }

      this.students = [...this.students];
      this.studentDialog = false;
      this.addStudentChange.emit(this.studentDialog);
      this.editMode = false;
      this.student = {} as any;
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].studentId === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
