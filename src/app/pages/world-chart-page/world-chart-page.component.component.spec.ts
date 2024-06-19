import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldChartPageComponentComponent } from './world-chart-page.component.component';

describe('WorldChartPageComponentComponent', () => {
  let component: WorldChartPageComponentComponent;
  let fixture: ComponentFixture<WorldChartPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorldChartPageComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorldChartPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
