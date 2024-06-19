import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearChartPageComponentComponent } from './year-chart-page.component.component';

describe('YearChartPageComponentComponent', () => {
  let component: YearChartPageComponentComponent;
  let fixture: ComponentFixture<YearChartPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearChartPageComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YearChartPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
