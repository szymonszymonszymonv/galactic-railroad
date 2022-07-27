import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { MedicsScheduleComponent } from './admin/medics-schedule/medics-schedule.component';
import { MedicsComponent } from './admin/medics/medics.component';
import { RegisterComponent } from './admin/register/register.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';

const routes: Routes = [
  {path: `admin`, component: AdminComponent},
  {path: `admin/register`, component: RegisterComponent},
  {path: `admin/login`, component: LoginComponent},
  {path: `admin/medics`, component: MedicsComponent},
  {path: `admin/medics/:id/schedule`, component: MedicsScheduleComponent},
  {path: `schedule-appointment`, component: ScheduleAppointmentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 