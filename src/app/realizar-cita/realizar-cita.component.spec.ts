import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarCitaComponent } from './realizar-cita.component';

describe('RealizarCitaComponent', () => {
  let component: RealizarCitaComponent;
  let fixture: ComponentFixture<RealizarCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealizarCitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
