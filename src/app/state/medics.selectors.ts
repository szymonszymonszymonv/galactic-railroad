import { createSelector, createFeatureSelector } from "@ngrx/store";
import { Medic } from "../medic/medic";


export const selectMedics = createFeatureSelector<Medic[]>('medics')
