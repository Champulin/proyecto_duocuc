import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoUnidadComponent } from './calculo-unidad.component';

describe('CalculoUnidadComponent', () => {
  let component: CalculoUnidadComponent;
  let fixture: ComponentFixture<CalculoUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcuUnidadloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculoUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
