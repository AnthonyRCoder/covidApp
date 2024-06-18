import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidChartComponent } from './covid-chart.component';

describe('CovidChartComponent', () => {
  let component: CovidChartComponent;
  let fixture: ComponentFixture<CovidChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CovidChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CovidChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
