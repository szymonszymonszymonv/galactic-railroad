import { createReducer, on } from "@ngrx/store"
import { addAppointment, addMedic, retrievedAppointmentsList, retrievedMedicsList, selectMedic } from "./medics.actions"
import { Medic } from "../medic/medic"
import { AppState } from "./app.state"
import { MedicsState } from "./medics.state"


export const initialState: MedicsState = {
    // medics: {
        
    // }
    medics: [],
    selectedMedic: null,
    appointments: []
}

export const medicsReducer = createReducer(
    initialState,
    // on(retrievedMedicsList, (state, {medics}) => ({ ...state, medics: [...medics] })),
    on(retrievedMedicsList, (state, {medics}) => ({...state, medics: medics})),
    on(addMedic, (state, { medic }) => ({ ...state, medics: [...state.medics, medic]})),
    on(addAppointment, (state, { appointment }) => ({ ...state, appointments: [...state.appointments, appointment]})),
    on(selectMedic, (state, { medic }) => ({...state, selectedMedic: medic})),
    on(retrievedAppointmentsList, (state, { appointments }) => ({ ...state, appointments: appointments}))
)