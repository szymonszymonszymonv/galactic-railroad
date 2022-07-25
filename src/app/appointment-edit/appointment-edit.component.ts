import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.sass']
})
export class AppointmentEditComponent implements OnInit {



  @Input() set appointment(appointment: Appointment) {
    this._appointment = appointment
    this.startDateISO = this.dateForDateTimeInputValue(appointment.startDate as Date)
    this.endDateISO = this.dateForDateTimeInputValue(appointment.endDate as Date)
  }
  @Output() sendEdit = new EventEmitter<Appointment>()

  _appointment: Appointment | null = {} as Appointment
  startDateISO: string = ""
  endDateISO: string = ""

  constructor() { }
  
  ngOnInit(): void {
  }

  send(): void {
    this.sendEdit.emit()
  }

  dateForDateTimeInputValue(date: Date): string {
    if(date) {
      return new Date(date?.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19)
    }
    return ""
  } 

}
