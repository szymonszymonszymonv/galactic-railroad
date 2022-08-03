import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Patient } from '../patient';

@Component({
  selector: 'app-patient-info-dialog',
  templateUrl: './patient-info-dialog.component.html',
  styleUrls: ['./patient-info-dialog.component.sass']
})
export class PatientInfoDialogComponent implements OnInit {

  patient: Patient = {} as Patient
  error: boolean = false

  constructor(public dialogRef: MatDialogRef<PatientInfoDialogComponent>) { }

  ngOnInit(): void {
    
  }

  closeDialog() {
    if(!this.patient.firstName || !this.patient.lastName) {
      this.error = true
      return
    }
    this.error = false
    this.dialogRef.close(this.patient)
  }

}
