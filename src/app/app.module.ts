import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MedicsComponent } from './admin/medics/medics.component';
import { MedicsScheduleComponent } from './admin/medics-schedule/medics-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicsComponent,
    MedicsScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
