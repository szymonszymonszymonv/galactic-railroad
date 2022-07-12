import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './admin/login/login.component';
import { MedicsScheduleComponent } from './admin/medics-schedule/medics-schedule.component';
import { MedicsComponent } from './admin/medics/medics.component';
import { RegisterComponent } from './admin/register/register.component';

const routes: Routes = [
  {path: `admin`, component: AdminComponent},
  {path: `admin/register`, component: RegisterComponent},
  {path: `admin/login`, component: LoginComponent},
  {path: `admin/medics`, component: MedicsComponent},
  {path: `admin/medics/schedule`, component: MedicsScheduleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
