import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicsComponent } from './admin/medics/medics.component';
import { MedicsScheduleComponent } from './admin/medics-schedule/medics-schedule.component';
import { RegisterComponent } from './admin/register/register.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { MatListModule } from '@angular/material/list';
import { medicsReducer } from './state/medics.reducer';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { MatDividerModule } from '@angular/material/divider';
import { AppointmentCardComponent } from './appointment-card/appointment-card.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppointmentEditComponent } from './appointment-edit/appointment-edit.component';
import { ScheduleAppointmentComponent } from './schedule-appointment/schedule-appointment.component';
import { MatSelectModule } from '@angular/material/select';
import { PatientInfoDialogComponent } from './patient-info-dialog/patient-info-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    MedicsComponent,
    MedicsScheduleComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    AppointmentCardComponent,
    AppointmentEditComponent,
    ScheduleAppointmentComponent,
    PatientInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forRoot({ medics: medicsReducer }),
    MatListModule,
    MatCardModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatDividerModule,
    MatSidenavModule,
    MatSelectModule,
    MatDialogModule,
    MatMenuModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
