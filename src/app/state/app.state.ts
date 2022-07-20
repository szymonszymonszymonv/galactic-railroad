import { Appointment } from "../appointment"
import { Medic } from "../medic/medic"
import { MedicsState } from "./medics.state"

export interface AppState {
    medics: MedicsState
    // selectedMedic: Medic | null
    // appointments: Appointment[]
} 