import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskCalculatorComponent } from './risk-calculator.component';

describe('RiskCalculatorComponent', () => {
  let component: RiskCalculatorComponent;
  let fixture: ComponentFixture<RiskCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
