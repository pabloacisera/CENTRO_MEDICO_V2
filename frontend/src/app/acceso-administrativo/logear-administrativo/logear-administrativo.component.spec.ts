import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogearAdministrativoComponent } from './logear-administrativo.component';

describe('LogearAdministrativoComponent', () => {
  let component: LogearAdministrativoComponent;
  let fixture: ComponentFixture<LogearAdministrativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogearAdministrativoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogearAdministrativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
