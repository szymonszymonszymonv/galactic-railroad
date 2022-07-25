import { createAction, props } from "@ngrx/store";
import { Appointment } from "../appointment";
import { Medic } from "../medic/medic";

export const retrievedMedicsList = createAction('[Medic Collection/API] Retrieve Medics', props<{medics: Medic[]}>())
export const addMedic = createAction('[Medic Collection/API] Add Medic', props<{medic: Medic}>()) 
export const selectMedic = createAction('[Medics List] Select Medic', props<{medic: Medic}>())
export const addAppointment = createAction('[Schedule] Add Appointment', props<{appointment: Appointment}>())
export const removedAppointment = createAction('[Schedule] Remove Appointment', props<{appointment: Appointment}>())
export const retrievedAppointmentsList = createAction('[Appointment Collection/API] Retrieve Appointments', props<{appointments: Appointment[]}>())
export const selectedCurrentDate = createAction('[Schedule] Select Current Date', props<{currentDate: Date}>())
