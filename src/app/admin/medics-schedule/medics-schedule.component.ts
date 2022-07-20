import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MedicService } from 'src/app/medic/medic.service';
import {
  addAppointment,
  retrievedAppointmentsList,
} from 'src/app/state/medics.actions';
import {
  selectAppointments,
  selectChosenMedic,
} from 'src/app/state/medics.selectors';
import { Appointment } from '../../appointment';
import { Patient } from '../../patient';

@Component({
  selector: 'app-medics-schedule',
  templateUrl: './medics-schedule.component.html',
  styleUrls: ['./medics-schedule.component.sass'],
})
export class MedicsScheduleComponent implements OnInit {
  // TODO: split into smaller components

  EVENT_SIZE: number = 6;
  START_HOUR: number = 8;

  currentDate: Date = new Date();

  schedule$ = this.store.select(selectAppointments);
  selectedMedic$ = this.store.select(selectChosenMedic);

  appointmentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  events: any = [
    // {
    //   event: {
    //     startingDate: new Date('2022-07-20T08:20:00'),
    //     endingDate: new Date('2022-07-20T09:00:00'),
    //   },
    //   height: 1,
    //   margin: 1,
    // },
    // {
    //   event: {
    //     startingDate: new Date('2022-07-20T09:30:00'),
    //     endingDate: new Date('2022-07-20T11:00:00'),
    //   },
    //   height: 1,
    //   margin: 1,
    // },
  ];

  constructor(private medicService: MedicService, private store: Store) {}

  ngOnInit(): void {
    // this.initializeMarginsSizes();
    this.getAppointments();
    this.schedule$.subscribe((appointments) => this.handleAppointments(appointments))
  }

  addAppointment(): void {
    const appointment: Appointment = {
      startDate: new Date(this.appointmentForm.value.startDate!),
      endDate: new Date(this.appointmentForm.value.endDate!),
      patient: {
        firstName: this.appointmentForm.value.firstName!,
        lastName: this.appointmentForm.value.lastName!,
      },
    };
    this.medicService
      .addAppointment(appointment)
      .subscribe(appointment =>
        this.store.dispatch(addAppointment({ appointment }))
      );
    // this.initializeMarginsSizes();
  }

  getAppointments(): void {
    this.medicService
      .getAppointments()
      .subscribe(appointments => this.store.dispatch(retrievedAppointmentsList({appointments})))
      // .subscribe((appointments) => this.handleAppointments(appointments));
  }

  handleAppointments(appointments: Appointment[]): void {
    let previous = null;
    this.events = [...appointments.map(item => ({...item}))];

    for (let i = 0; i < this.events.length; i++) {
      // set height
      let timeDiff = this.events[i].endDate - this.events[i].startDate;
      let timeInMinutes = timeDiff / (1000 * 60);
      this.events[i].height = (this.EVENT_SIZE * timeInMinutes) / 60;

      if (this.events[i].height > 6) {
        // ??? witchcraft
        this.events[i].height += Math.ceil(this.events[i].height / 6) - 1;
      }
      this.events[i].height = this.events[i].height.toFixed(2);

      // set margin
      // if no previous event, difference in time between current event and START_HOUR
      if (i === 0) {
        let startTime = new Date(this.events[i].startDate);
        startTime.setHours(this.START_HOUR);
        startTime.setMinutes(0);

        timeDiff =
          (this.events[i].startDate).getTime() - startTime.getTime();
        timeInMinutes = timeDiff / (1000 * 60);
      } else {
        // difference in time between current and previous event
        timeDiff =
          (this.events[i].startDate ).getTime() -
          this.events[i - 1].endDate.getTime();
        timeInMinutes = timeDiff / (1000 * 60);
      }
      this.events[i].margin = ((this.EVENT_SIZE * timeInMinutes) / 60).toFixed(2);

      // make it rem
      this.events[i].margin = this.events[i].margin + 'rem';
      this.events[i].height = this.events[i].height + 'rem';
    }

    // this.store.dispatch(retrievedAppointmentsList({ appointments }));
  }
}
