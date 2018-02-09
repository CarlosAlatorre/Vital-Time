import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSymptomsComponent } from './add-symptoms.component';

describe('AddSymptomsComponent', () => {
  let component: AddSymptomsComponent;
  let fixture: ComponentFixture<AddSymptomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSymptomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSymptomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
