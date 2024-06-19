import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19ChartComponent } from './covid19-chart.component';

describe('Covid19ChartComponent', () => {
  let component: Covid19ChartComponent;
  let fixture: ComponentFixture<Covid19ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Covid19ChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Covid19ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
