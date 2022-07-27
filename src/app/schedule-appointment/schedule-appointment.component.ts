import { Component, OnInit } from '@angular/core';
import { MedicService } from '../medic/medic.service';
import { Specialty } from '../specialty';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.sass']
})
export class ScheduleAppointmentComponent implements OnInit {

  APPOINTMENT_LENGTH = 30

  _startDate: string = ""
  set startDate(startDate: any) {
    this._startDate = startDate
    this.getAvailableAppointments(this.options)
  }

  _endDate: string = ""
  set endDate(endDate: any) {
    this._endDate = endDate
    this.getAvailableAppointments(this.options)
  }

  _specialty: any = null
  set specialty(specialty: any) {
    this._specialty = specialty
    this.getAvailableAppointments(this.options)
  }

  options = {
    startDate: this._startDate,
    endDate: this._endDate,
    specialty: this._specialty
  }

  allSpecialties: Specialty[] = []

  constructor(private medicService: MedicService) {  }

  ngOnInit(): void {
    this.getSpecialties()
  }

  getSpecialties(): void {
    this.medicService.getSpecialties().subscribe(specialties => this.allSpecialties = specialties)
  }

  getAvailableAppointments(options: object): void {
    this.medicService.getAvailableAppointments(options).subscribe(item => {console.log(item)})
  }

}
