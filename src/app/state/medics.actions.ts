import { createAction, props } from "@ngrx/store";
import { Medic } from "../medic/medic";

export const retrievedMedicsList = createAction('[Medic Collection/API] Retrieve Medics', props<{medics: Medic[]}>())
export const addMedic = createAction('[Medic Collection/API] Add Medic', props<{medic: Medic}>()) 