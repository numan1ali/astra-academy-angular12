import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StudentService } from 'src/app/shared/services/student.service';
import { TeacherService } from '../../services/teacher.service';
import { Student } from '../../student-model';
import { Teacher } from '../../teacher-model';
import { User } from '../../user-model';
@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CreateTeacherComponent implements OnInit {
  credentialForm!: FormGroup;
  personalDetailForm!: FormGroup;
  createMode: boolean = false;
  personalFormState: boolean = false;
  createdUser!: User;
  loading: boolean = false;
  @Input('teacherDialog') teacherDialog = false;
  @Output('teacherDialogChange') teacherDialogChange = new EventEmitter();
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.personalDetailForm = this.fb.group({
      name: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]],
      majorSubject: ['', [Validators.required]],
      address: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(20), Validators.max(60)]],
      available: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  nextPage() {
    this.loading = true;
    let body = {
      ...this.credentialForm.value,
      role: 'teacher',
    };
    this.studentService
      .createStudentCredentials(body)
      .subscribe((user: User) => {
        this.createdUser = user;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: `Teacher's credentials created.`,
          life: 2000,
        });
        this.personalFormState = true;
        this.loading = false;
      });
  }
  openNew() {
    this.teacherDialog = true;
  }
  hideDialog() {
    this.teacherDialog = false;
    this.personalFormState = false;
    this.teacherDialogChange.emit(false);
  }

  saveTeacher() {
    if (this.personalFormState && this.personalDetailForm.valid) {
      this.loading = true;
      let Body = {
        ...this.personalDetailForm.value,
        userId: this.createdUser.userId,
      };
      this.teacherService.createTeacher(Body).subscribe((res: Teacher) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: `Student created successfully.`,
          life: 2000,
        });
        this.teacherDialog = false;
        this.teacherDialogChange.emit(this.teacherDialog);
        this.personalFormState = false;
        this.loading = false;
      });
    }
  }
}
