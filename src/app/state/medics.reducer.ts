import { createReducer, on } from '@ngrx/store';
import {
  addAppointment,
  addMedic,
  editedAppointment,
  removedAppointment,
  retrievedAppointmentsList,
  retrievedMedicsList,
  selectedCurrentDate,
  selectMedic,
} from './medics.actions';
import { Medic } from '../medic/medic';
import { AppState } from './app.state';
import { MedicsState } from './medics.state';

export const initialState: MedicsState = {
  // medics: {

  // }
  medics: [],
  selectedMedic: null,
  appointments: [],
  currentDate: new Date()
};

export const medicsReducer = createReducer(
  initialState,
  // on(retrievedMedicsList, (state, {medics}) => ({ ...state, medics: [...medics] })),
  on(retrievedMedicsList, (state, { medics }) => ({
    ...state,
    medics: medics,
  })),

  on(addMedic, (state, { medic }) => ({
    ...state,
    medics: [...state.medics, medic],
  })),

  on(addAppointment, (state, { appointment }) => ({
    ...state,
    appointments: [...state.appointments, appointment],
  })),

  on(removedAppointment, (state, { appointment }) => ({
    ...state,
    appointments: [...state.appointments].filter(item => item._id !== appointment._id),
  })),

  on(selectMedic, (state, { medic }) => ({ ...state, selectedMedic: medic })),
  // TODO: map, sort appointments here
  on(retrievedAppointmentsList, (state, { appointments }) => ({
    ...state,
    appointments: appointments,
  })),

  on(selectedCurrentDate, (state, { currentDate }) => ({
    ...state,
    currentDate: currentDate,
  })),

  on(editedAppointment, (state, { appointment }) => ({
    ...state,
    appointments: [...state.appointments].map(item => item._id === appointment._id ? appointment : item)
  }))
);
