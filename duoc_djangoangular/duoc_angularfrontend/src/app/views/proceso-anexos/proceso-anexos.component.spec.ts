import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoAnexosComponent } from './proceso-anexos.component';

describe('ProcesoAnexosComponent', () => {
  let component: ProcesoAnexosComponent;
  let fixture: ComponentFixture<ProcesoAnexosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoAnexosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoAnexosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
