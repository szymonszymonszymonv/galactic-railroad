import { Appointment } from "../appointment"
import { Medic } from "../medic/medic"

export interface MedicsState {
    medics: Medic[]
    selectedMedic: Medic | null
    appointments: Appointment[]
} 