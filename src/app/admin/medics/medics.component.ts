import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Medic } from 'src/app/medic/medic';
import { MedicService } from 'src/app/medic/medic.service';
import { AppState } from 'src/app/state/app.state';
import { addMedic, retrievedMedicsList } from 'src/app/state/medics.actions';
import { selectMedics, selectMedicsItems } from 'src/app/state/medics.selectors';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.sass']
})
export class MedicsComponent implements OnInit {

  medics$: Observable<Medic[]> = this.store.select(selectMedicsItems)

  constructor(
    private medicService: MedicService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.getMedics()
  }

  getMedics(): void {
    this.medicService.getMedics()
      .subscribe(medics => this.store.dispatch(retrievedMedicsList({ medics })))
      console.log(this.medics$)
  }

  addMedic(): void {
    // this.medicService.addMedic()
    //   .subscribe(medic => this.store.dispatch(addMedic({ medic })))
  }

}
