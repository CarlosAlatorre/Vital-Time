import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanciaCaminoComponent } from './ambulancia-camino.component';

describe('AmbulanciaCaminoComponent', () => {
  let component: AmbulanciaCaminoComponent;
  let fixture: ComponentFixture<AmbulanciaCaminoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbulanciaCaminoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulanciaCaminoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
