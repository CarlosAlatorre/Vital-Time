import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsQueueComponent } from './patients-queue.component';

describe('PatientsQueueComponent', () => {
  let component: PatientsQueueComponent;
  let fixture: ComponentFixture<PatientsQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientsQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
