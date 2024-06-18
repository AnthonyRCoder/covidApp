import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpfulResourcesComponent } from './helpful-resources.component';

describe('HelpfulResourcesComponent', () => {
  let component: HelpfulResourcesComponent;
  let fixture: ComponentFixture<HelpfulResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpfulResourcesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpfulResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
