import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './components/teacher/teacher.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [TeacherComponent],
  imports: [CommonModule, TeacherRoutingModule, SharedModule],
})
export class TeacherModule {}
