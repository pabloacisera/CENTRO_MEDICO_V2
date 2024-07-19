import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarNomenclaturaComponent } from './buscar-nomenclatura.component';

describe('BuscarNomenclaturaComponent', () => {
  let component: BuscarNomenclaturaComponent;
  let fixture: ComponentFixture<BuscarNomenclaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarNomenclaturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuscarNomenclaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
