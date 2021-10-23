import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student/student.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RippleModule } from 'primeng/ripple';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [StudentComponent, LoadingComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    RippleModule,
    InputNumberModule,
    SelectButtonModule,
    InputSwitchModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    DialogModule,
    InputTextModule,
    CardModule,
    PasswordModule,
  ],
  exports: [
    StudentComponent,
    ToolbarModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    RippleModule,
    InputNumberModule,
    SelectButtonModule,
    InputSwitchModule,
    CardModule,
    PasswordModule,
    LoadingComponent,
  ],
})
export class SharedModule {}
