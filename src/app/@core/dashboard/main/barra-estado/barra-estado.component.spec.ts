import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraEstadoComponent } from './barra-estado.component';

describe('BarraEstadoComponent', () => {
  let component: BarraEstadoComponent;
  let fixture: ComponentFixture<BarraEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
