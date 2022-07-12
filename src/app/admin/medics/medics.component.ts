import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MedicService } from 'src/app/medic/medic.service';
import { addMedic, retrievedMedicsList } from 'src/app/state/medics.actions';
import { selectMedics } from 'src/app/state/medics.selectors';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.sass']
})
export class MedicsComponent implements OnInit {

  medics$ = this.store.select(selectMedics)

  constructor(
    private medicService: MedicService,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.getMedics()
  }

  getMedics(): void {
    this.medicService.getMedics()
      .subscribe(medics => this.store.dispatch(retrievedMedicsList({ medics })))
  }

  addMedic(): void {
    // this.medicService.addMedic()
    //   .subscribe(medic => this.store.dispatch(addMedic({ medic })))
  }

}
