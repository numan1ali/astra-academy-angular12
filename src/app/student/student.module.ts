import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StudentRoutingModule } from './student-routing.module';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { StudentViewComponent } from './components/student-view/student-view.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [StudentViewComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    StudentRoutingModule,
    RippleModule,
    InputNumberModule,
    StudentRoutingModule,
    SharedModule,
  ],
})
export class StudentModule {}
