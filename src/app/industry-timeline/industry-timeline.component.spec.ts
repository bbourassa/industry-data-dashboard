import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryTimelineComponent } from './industry-timeline.component';

describe('IndustryTimelineComponent', () => {
  let component: IndustryTimelineComponent;
  let fixture: ComponentFixture<IndustryTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
