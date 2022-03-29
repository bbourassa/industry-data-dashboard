import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryHomepageComponent } from './industry-homepage.component';

describe('IndustryHomepageComponent', () => {
  let component: IndustryHomepageComponent;
  let fixture: ComponentFixture<IndustryHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
