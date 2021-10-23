import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StudentService } from 'src/app/shared/services/student.service';
import { Student } from '../../student-model';
import { User } from '../../user-model';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class CreateStudentComponent implements OnInit {
  // studentDialog: boolean | undefined;
  editMode: boolean = false;
  loading: boolean = false;
  credentialForm!: FormGroup;
  personalDetailForm!: FormGroup;
  createMode: boolean = false;
  personalFormState: boolean = false;
  createdUser!: User;
  @Input('studentDialog') studentDialog = false;
  @Output('studentDialogChange') studentDialogChange = new EventEmitter();
  @Output('studentDetail') studentDetail = new EventEmitter();
  constructor(
    private studentService: StudentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {
    this.credentialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.personalDetailForm = this.fb.group({
      name: ['', [Validators.required]],
      rollNumber: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      batch: ['', [Validators.required]],
      gpa: ['', [Validators.required]],
      assignedTeacher: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  nextPage() {
    this.loading = true;
    let body = {
      ...this.credentialForm.value,
      role: 'student',
    };
    this.studentService
      .createStudentCredentials(body)
      .subscribe((user: User) => {
        this.createdUser = user;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: `Student's credentials created.`,
          life: 2000,
        });
        this.personalFormState = true;
        this.loading = false;
      });
  }
  openNew() {
    this.studentDialog = true;
  }
  hideDialog() {
    this.studentDialog = false;
    this.personalFormState = false;
    this.studentDialogChange.emit(false);
  }

  saveStudent() {
    if (this.personalFormState && this.personalDetailForm.valid) {
      this.loading = true;
      let studentBody = {
        ...this.personalDetailForm.value,
        userId: this.createdUser.userId,
      };
      this.studentService
        .createStudent(studentBody)
        .subscribe((res: Student) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: `Student created successfully.`,
            life: 2000,
          });
          this.studentDialog = false;
          this.studentDialogChange.emit(this.studentDialog);
          this.editMode = false;
          this.personalFormState = false;
          this.loading = false;
        });
    }
  }
}
