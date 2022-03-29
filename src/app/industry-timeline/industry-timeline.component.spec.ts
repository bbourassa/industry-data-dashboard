import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IndustryTimelineComponent } from './industry-timeline.component';

describe('IndustryTimelineComponent', () => {
  let component: IndustryTimelineComponent;
  let fixture: ComponentFixture<IndustryTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryTimelineComponent ],
      imports: [HttpClientTestingModule]
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

  it('should addRow', () => {
    expect(component.items.length).toEqual(0)
    expect(component.noIndustryAdd).toBeFalse()
    component.addRow();
    expect(component.items.length).toEqual(1)
    component.addRow();
    expect(component.noIndustryAdd).toBeFalse()
    expect(component.items.length).toEqual(2)
    component.addRow();
    expect(component.items.length).toEqual(3)
    expect(component.noIndustryAdd).toBeTrue()
  })

  it('should removeRow', () => {
    component.addRow();
    component.addRow();
    component.addRow();
    expect(component.items.length).toEqual(3)
    component.removeRow();
    expect(component.noIndustryAdd).toBeFalse()
    expect(component.noIndustryRemove).toBeFalse()
    component.removeRow()
    expect(component.noIndustryRemove).toBeFalse()
    component.removeRow()
    expect(component.noIndustryRemove).toBeTrue()
  });

  it('should checkMeasurement and noState should be true', () => {
      component.selectedInfo[0].Measurement = 'Hires'
      component.checkMeasurement()
      expect(component.noState).toBeTrue()
      component.selectedInfo[0].Measurement = 'Job Openings'
      component.checkMeasurement()
      expect(component.noState).toBeTrue()
      component.selectedInfo[0].Measurement = 'Layoffs & Discharges'
      component.checkMeasurement()
      expect(component.noState).toBeTrue()
  });

  it('should checkMeasurement and noState should be false', () => {
    component.selectedInfo[0].Measurement = 'Number of Employees'
    component.checkMeasurement()
    expect(component.noState).toBeFalse()
    component.selectedInfo[0].Measurement = 'Average Weekly Wage'
    component.checkMeasurement()
    expect(component.noState).toBeFalse()
    component.selectedInfo[0].Measurement = 'Average Annual Pay'
    component.checkMeasurement()
    expect(component.noState).toBeFalse()
})
});
