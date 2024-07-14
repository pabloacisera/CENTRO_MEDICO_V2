import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogearComponent } from './logear.component';

describe('LogearComponent', () => {
  let component: LogearComponent;
  let fixture: ComponentFixture<LogearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
