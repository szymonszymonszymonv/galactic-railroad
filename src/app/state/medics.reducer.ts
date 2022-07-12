import { createReducer, on } from "@ngrx/store"
import { addMedic, retrievedMedicsList } from "./medics.actions"
import { Medic } from "../medic/medic"


export const initialState: Medic[] = []

export const medicsReducer = createReducer(
    initialState,
    on(retrievedMedicsList, (state, { medics }) => medics),
    on(addMedic, (state, { medic }) => [...state, medic])
)