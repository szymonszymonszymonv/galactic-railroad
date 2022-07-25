import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Appointment } from '../appointment';
import { Medic } from '../medic/medic';
import { AppState } from './app.state';
import { MedicsState } from './medics.state';

export const selectMedics = createFeatureSelector<MedicsState>('medics');
export const selectMedicsItems = createSelector(
  selectMedics,
  (medics) => medics.medics
);
export const selectChosenMedic = createSelector(
  selectMedics,
  (medics) => medics.selectedMedic
);
export const selectAppointments = createSelector(
  selectMedics, 
  // (medics) => medics.appointments
  (medics) => 
  [...medics.appointments]
    .sort((a, b) => {
      return (
        Date.parse(a.startDate as string) - Date.parse(b.startDate as string)
      );
    })
    .map((appointment) => {
      return {
        ...appointment,
        startDate: new Date(appointment.startDate),
        endDate: new Date(appointment.endDate),
      };
    })
);

// TODO: THIS 
export const selectCurrentDate = createSelector(
  selectMedics,
  (medics) => medics.currentDate
)

// TODO: AND THIS
export const selectCurrentAppointments = createSelector(
  selectCurrentDate, selectAppointments,
  (currentDate: Date, appointments: Appointment[]) =>
  [...appointments]
    .filter(appointment => {
      // get appointments with chosen date      
      let fromDate = new Date()
      let toDate = new Date()

      // from monday current week
      fromDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
      fromDate.setHours(8)
      fromDate.setMinutes(0)

      // to sunday current week
      toDate.setDate(currentDate.getDate() + (7 - currentDate.getDay()))
      toDate.setHours(22)
      toDate.setMinutes(0)
      return (appointment.startDate as Date).getTime() > fromDate.getTime() 
              && (appointment.endDate as Date).getTime() < toDate.getTime()
    })
)
