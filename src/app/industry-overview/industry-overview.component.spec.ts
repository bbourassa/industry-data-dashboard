import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { IndustryOverviewComponent } from './industry-overview.component';

describe('IndustryOverviewComponent', () => {
  let component: IndustryOverviewComponent;
  let fixture: ComponentFixture<IndustryOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryOverviewComponent ],
      imports: [ HttpClientTestingModule, NgxChartsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should checkGenerate and contain selects', () => {
      component.checkGenerate()
      expect(component.noGenerate).toBeTrue();
  });

  it('should checkGenerate and contain no selects', () => {
     component.selectedInfo['Industry'] = 'Construction';
     component.selectedInfo['State'] = 'Massachusetts';
     component.selectedInfo['Year'] = '2007';
     component.checkGenerate();
     expect(component.noGenerate).toBeFalse();
  });

  it('should call setStateRadar and update multi', () => {
     component.multi.push({'name': 'Construction', 'series': []})
     let graphInfo = [{'value': 2350}]
     let dataPoint = 'Job Openings'
     component.setStateRadar(graphInfo, dataPoint)
  });

  it('should call setCountryRadar and update multi2', () => {
     component.multi2.push({'name': 'Construction', 'series': []})
     let graphInfo = [{'value': 235}]
     let dataPoint = 'Hires'
     component.setCountryRadar(graphInfo, dataPoint)
  });

  it('should generateGraphs', () => {
      component.generateGraphs();
      //TODO: FINISH GENERATEGRAPHS 
  })
});
