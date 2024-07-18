import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoAdminComponent } from './turno-admin.component';

describe('TurnoAdminComponent', () => {
  let component: TurnoAdminComponent;
  let fixture: ComponentFixture<TurnoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurnoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
