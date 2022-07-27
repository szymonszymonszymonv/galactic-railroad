import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MedicService } from 'src/app/medic/medic.service';
import {
  addAppointment,
  editedAppointment,
  removedAppointment,
  retrievedAppointmentsList,
  selectedCurrentDate,
} from 'src/app/state/medics.actions';
import {
  selectAppointments,
  selectChosenMedic,
  selectCurrentAppointments,
  selectCurrentDate,
} from 'src/app/state/medics.selectors';
import { Appointment } from '../../appointment';
import { Patient } from '../../patient';

@Component({
  selector: 'app-medics-schedule',
  templateUrl: './medics-schedule.component.html',
  styleUrls: ['./medics-schedule.component.sass'],
})
export class MedicsScheduleComponent implements OnInit, OnDestroy {

  // TODO: split into smaller components

  EVENT_SIZE: number = 6;
  START_HOUR: number = 8;

  currentDate: Date = new Date();

  schedule$ = this.store.select(selectAppointments);
  selectedMedic$ = this.store.select(selectChosenMedic);
  currentAppointments$ = this.store.select(selectCurrentAppointments)

  appointmentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  events: any = [];
  eventsDays: { [key: number]: any[] } = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  activeAppointment: Appointment = {} as Appointment
  editOpened: boolean = false

  constructor(private medicService: MedicService, private store: Store) {}

  ngOnDestroy(): void {
    this.store.dispatch(selectedCurrentDate({currentDate: new Date()}))
  }

  ngOnInit(): void {
    this.getAppointments();
    // this.schedule$.subscribe((appointments) => this.handleAppointments(appointments))
    this.currentAppointments$.subscribe(appointments => this.handleAppointments(appointments))
  }

  // js modulo sucks
  mod(a: number, b: number): number {
    return ((a % b) + b) % b
  }

  addAppointment(): void {
    const appointment: Appointment = {
      startDate: new Date(this.appointmentForm.value.startDate!),
      endDate: new Date(this.appointmentForm.value.endDate!),
      patient: {
        firstName: this.appointmentForm.value.firstName!,
        lastName: this.appointmentForm.value.lastName!,
      },
      description: this.appointmentForm.value.description!
    };
    this.medicService
      .addAppointment(appointment)
      .subscribe(appointment =>
        this.store.dispatch(addAppointment({ appointment }))
      );
  }
  editAppointment(appointment: Appointment): void {
    appointment = {
      ...appointment,
      startDate: new Date(appointment.startDate),
      endDate: new Date(appointment.endDate)
    }
    this.medicService
      .editAppointment(appointment)
      .subscribe(appointment =>
        this.store.dispatch(editedAppointment({ appointment }))
      )
  }

  removeAppointment(appointment: Appointment): void {
    this.medicService.removeAppointment(appointment._id!).subscribe(appointment => 
      this.store.dispatch(removedAppointment({appointment}))  
    )
  }

  selectAppointment(appointment: Appointment): void {
    this.editOpened = true
    this.activeAppointment = appointment
  }

  getAppointments(): void {
    this.medicService
      .getAppointments()
      .subscribe(appointments => this.store.dispatch(retrievedAppointmentsList({appointments})))
    }
    
  onSelectDate(): void {
    this.store.dispatch(selectedCurrentDate({currentDate: this.currentDate}))
  }

  handleAppointments(appointments: Appointment[]): void {
    this.events = [...appointments.map(item => ({...item}))];
    // clear arrays
    for(let day in this.eventsDays) {
      this.eventsDays[day].length = 0
    }
    for(let appointment of this.events) {
      this.eventsDays[this.mod((appointment.startDate as Date).getDay() - 1, 7)].push(appointment)
    }
    for(let day in this.eventsDays) {
      let previous: Appointment | null = null
      
      for (let event of this.eventsDays[day]) {
        // set height
        let timeDiff = event.endDate - event.startDate;
        let timeInMinutes = timeDiff / (1000 * 60);
        event.height = (this.EVENT_SIZE * timeInMinutes) / 60;
  
        // ??? witchcraft
        if (event.height > 6) {
          event.height += Math.ceil(event.height / this.EVENT_SIZE) - 1;
        }
        event.height = event.height.toFixed(2);
  
        // set margin
        // if no previous event, difference in time between current event and START_HOUR
        if (!previous) {
          let startTime = new Date(event.startDate);
          startTime.setHours(this.START_HOUR);
          startTime.setMinutes(0);
          
          timeDiff =
            (event.startDate).getTime() - startTime.getTime();
          timeInMinutes = timeDiff / (1000 * 60);
        } else {
          // difference in time between current and previous event
          timeDiff =
            (event.startDate ).getTime() - (previous.endDate as Date).getTime();
          timeInMinutes = timeDiff / (1000 * 60);
        }
        event.margin = ((this.EVENT_SIZE * timeInMinutes) / 60);
        
        // ??? witchcraft 2
        if(event.margin >= 6) {
          event.margin += Math.floor(event.margin / this.EVENT_SIZE) 
        }
        event.margin = event.margin.toFixed(2)
  
        // make it rem
        event.margin = event.margin + 'rem';
        event.height = event.height + 'rem';
        previous = event
      }
    }
  }
}
