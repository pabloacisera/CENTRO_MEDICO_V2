import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomenclaturaComponent } from './nomenclatura.component';

describe('NomenclaturaComponent', () => {
  let component: NomenclaturaComponent;
  let fixture: ComponentFixture<NomenclaturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomenclaturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NomenclaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
