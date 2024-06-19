import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpfulresourcesPageComponentComponent } from './helpfulresources-page.component.component';

describe('HelpfulresourcesPageComponentComponent', () => {
  let component: HelpfulresourcesPageComponentComponent;
  let fixture: ComponentFixture<HelpfulresourcesPageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpfulresourcesPageComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpfulresourcesPageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
