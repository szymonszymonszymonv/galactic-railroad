import { Specialty } from "../specialty"

export interface Medic {
    _id?: string,
    firstName: string,
    lastName: string,
    specialty: Specialty
    schedule?: any // change type to Schedule
}