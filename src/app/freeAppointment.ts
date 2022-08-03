import { Medic } from "./medic/medic";

export interface FreeAppointment {
    _id?: string
    startDate: Date | string
    endDate: Date | string
    medic: Medic
    description?: string 
}
