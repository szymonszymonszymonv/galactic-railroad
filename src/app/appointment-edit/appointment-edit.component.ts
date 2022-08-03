import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../appointment';
import { dateForDateTimeInputValue } from '../utils';

@Component({
  selector: 'app-appointment-edit',
  templateUrl: './appointment-edit.component.html',
  styleUrls: ['./appointment-edit.component.sass']
})
export class AppointmentEditComponent implements OnInit {

  @Input() set appointment(appointment: Appointment) {

    if(Object.keys(appointment).length === 0) return

    this._appointment = appointment
    this.startDateISO = dateForDateTimeInputValue(appointment.startDate as Date)
    this.endDateISO = dateForDateTimeInputValue(appointment.endDate as Date)
    this.appointmentForm.setValue({
      _id: appointment._id!,
      firstName: this._appointment?.patient?.firstName,
      lastName: this._appointment?.patient?.lastName,
      description: this._appointment?.description! ?? '',
      startDate: this.startDateISO,
      endDate: this.endDateISO
    })
  }
  @Input() editOpened = true
  @Output() sendEdit = new EventEmitter<Appointment>()
  @Output() editOpenedChange = new EventEmitter<boolean>()

  _appointment: Appointment | null = {} as Appointment
  startDateISO: string = ""
  endDateISO: string = ""

  appointmentForm = new FormGroup({
    _id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  });

  constructor() { }
  
  ngOnInit(): void {
  }

  send(): void {
    this.sendEdit.emit(this.appointmentForm.value as Appointment)
  }
  cancel(): void {
    this.editOpenedChange.emit(false)
  }

}
