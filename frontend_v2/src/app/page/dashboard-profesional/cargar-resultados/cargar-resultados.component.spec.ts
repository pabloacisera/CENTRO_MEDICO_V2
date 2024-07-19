import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarResultadosComponent } from './cargar-resultados.component';

describe('CargarResultadosComponent', () => {
  let component: CargarResultadosComponent;
  let fixture: ComponentFixture<CargarResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarResultadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargarResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
