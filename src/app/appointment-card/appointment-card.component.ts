import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.sass']
})
export class AppointmentCardComponent implements OnInit {

  @Input() appointment: Appointment = {} as Appointment
  @Output() removeAppointment = new EventEmitter<Appointment>()
  @Output() selectAppointment = new EventEmitter<Appointment>()
  editing: boolean = false
  
  constructor() { }
  
  ngOnInit(): void {

  }
  
  deleteAppointment(): void {
    this.removeAppointment.emit(this.appointment)
  }


  editAppointment(): void {
    this.selectAppointment.emit(this.appointment)
  }

}
