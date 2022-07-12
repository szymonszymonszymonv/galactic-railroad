import { Specialty } from "../specialty"

export interface Medic {
    firstName: string,
    lastName: string,
    specialty: Specialty
    schedule: any // change type to Schedule
}