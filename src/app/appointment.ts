import { Patient } from "./patient";

export interface Appointment {
    _id?: string
    startDate: Date | string
    endDate: Date | string
    patient: Patient
    description?: string 
}
