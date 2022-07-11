import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicsScheduleComponent } from './medics-schedule.component';

describe('MedicsScheduleComponent', () => {
  let component: MedicsScheduleComponent;
  let fixture: ComponentFixture<MedicsScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicsScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
