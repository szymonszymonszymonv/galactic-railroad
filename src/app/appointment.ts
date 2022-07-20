import { Patient } from "./patient";

export interface Appointment {
    startDate: Date | string
    endDate: Date | string
    patient: Patient
}
