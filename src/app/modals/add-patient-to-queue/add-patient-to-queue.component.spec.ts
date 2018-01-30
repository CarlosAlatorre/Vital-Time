import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientToQueueComponent } from './add-patient-to-queue.component';

describe('AddPatientToQueueComponent', () => {
  let component: AddPatientToQueueComponent;
  let fixture: ComponentFixture<AddPatientToQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPatientToQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientToQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
