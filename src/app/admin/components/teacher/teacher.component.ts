import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../teacher-model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class TeacherComponent implements OnInit {
  teacherDialog: boolean | undefined;
  editMode: boolean = false;
  loading: boolean = true;
  @Input('teachersData') set teachersData(value: Teacher[]) {
    if (value) {
      this.teachers = value;
      this.loading = false;
    }
  }

  @Input('addTeacher') set addTeacher(value: boolean) {
    if (value) {
      this.openNew();
    }
  }
  @Output('addTeacherChange') addTeacherChange = new EventEmitter();
  teachers: Teacher[] = [];

  teacher!: Teacher;
  selectedTeachers: Teacher[] = [];

  submitted: boolean = false;
  constructor(
    private teacherService: TeacherService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}
  openNew() {
    this.teacher = {} as any;
    this.submitted = false;
    this.teacherDialog = true;
  }

  editTeacher(teacher: Teacher) {
    this.editMode = true;
    this.teacher = { ...teacher };
    this.teacherDialog = true;
  }

  deleteTeacher(teacher: Teacher) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + teacher.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.teacherService
          .deleteTeacher(teacher.teacherId)
          .subscribe((deletedTeacher: Teacher) => {
            this.teachers = this.teachers.filter(
              (teacher: Teacher) =>
                teacher.teacherId !== deletedTeacher.teacherId
            );
            this.teacher = {} as any;
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Teacher Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.teacherDialog = false;
    this.submitted = false;
    this.addTeacherChange.emit(false);
  }

  saveTeacher() {
    this.submitted = true;

    if (this.teacher.name.trim()) {
      if (this.editMode) {
        this.teacherService
          .updateTeacher(this.teacher.teacherId, this.teacher)
          .subscribe((editedTeacher: Teacher) => {
            this.teachers[this.findIndexById(editedTeacher.teacherId)] =
              editedTeacher;
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Teacher Updated',
              life: 3000,
            });
          });
      } else {
        this.teacherService
          .createTeacher(this.teacher)
          .subscribe((createdTeacher: Teacher) => {
            this.teachers.push(createdTeacher);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Teacher Created',
              life: 3000,
            });
          });
      }

      this.teachers = [...this.teachers];
      this.teacherDialog = false;
      this.addTeacherChange.emit(this.teacherDialog);
      this.editMode = false;
      this.teacher = {} as any;
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.teachers.length; i++) {
      if (this.teachers[i].teacherId === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
