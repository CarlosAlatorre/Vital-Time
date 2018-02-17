import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsOfPatientsComponent } from './questions-of-patients.component';

describe('QuestionsOfPatientsComponent', () => {
  let component: QuestionsOfPatientsComponent;
  let fixture: ComponentFixture<QuestionsOfPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsOfPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsOfPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
