import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraficoLlamadasComponent } from './trafico-llamadas.component';

describe('TraficoLlamadasComponent', () => {
  let component: TraficoLlamadasComponent;
  let fixture: ComponentFixture<TraficoLlamadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraficoLlamadasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraficoLlamadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
