import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './components/home/home.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { SharedModule } from '../shared/shared.module';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { CreateTeacherComponent } from './components/create-teacher/create-teacher.component';

@NgModule({
  declarations: [
    HomeComponent,
    TeacherComponent,
    CreateStudentComponent,
    CreateTeacherComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
