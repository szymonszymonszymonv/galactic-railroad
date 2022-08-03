import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FreeAppointment } from '../freeAppointment';
import { MedicService } from '../medic/medic.service';
import { Patient } from '../patient';
import { PatientInfoDialogComponent } from '../patient-info-dialog/patient-info-dialog.component';
import { Specialty } from '../specialty';
import { Appointment } from '../appointment'

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.sass']
})
export class ScheduleAppointmentComponent implements OnInit {

  APPOINTMENT_LENGTH = 30

  _startDate: string = ""
  get startDate(): string { return this._startDate }
  set startDate(startDate: any) {
    this._startDate = startDate
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { startDate: startDate },
      queryParamsHandling: 'merge'
    })
  }

  _endDate: string = ""
  get endDate(): string { return this._endDate }
  set endDate(endDate: any) {
    this._endDate = endDate
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { endDate: endDate },
      queryParamsHandling: 'merge'
    })
  }

  _specialty: string = ""
  get specialty(): string { return this._specialty }
  set specialty(specialty: string) {
    this._specialty = specialty
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { specialty: specialty },
      queryParamsHandling: 'merge'
    })
  }

  availableAppointments: FreeAppointment[] = []
  allSpecialties: Specialty[] = []
  patient: Patient = {} as Patient

  constructor(
    private medicService: MedicService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.startDate = params.get("startDate")
      this.endDate = params.get("endDate")
      this.specialty = params.get("specialty")!
      this.getAvailableAppointments()
    })
    this.getSpecialties()
  }

  getSpecialties(): void {
    this.medicService.getSpecialties().subscribe(specialties => this.allSpecialties = specialties)
  }

  getAvailableAppointments(): void {
    const options = {
      startDate: this.startDate,
      endDate: this.endDate,
      specialty: this.specialty
    }

    this.medicService.getAvailableAppointments(options).subscribe(data => {this.availableAppointments = data})
  }

  openDialog(available: FreeAppointment, idx: number): void {
    const dialogRef = this.dialog.open(PatientInfoDialogComponent)
    dialogRef.afterClosed().subscribe(patient => this.bookAnAppointment(available, patient, idx))
  }

  bookAnAppointment(available: FreeAppointment, patient: Patient, idx: number): void {
    console.log({available: available, patient: patient})
    const appointment: Appointment = {...available, patient: patient}
    this.medicService.addAppointment(appointment, available.medic._id!).subscribe(_ => {
      this.availableAppointments.splice(idx, 1)
    })
  }

}
