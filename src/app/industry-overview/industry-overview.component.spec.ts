import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IndustryDataService } from '../service/industry-data.service';

import { IndustryOverviewComponent } from './industry-overview.component';
import { of } from 'rxjs';

describe('IndustryOverviewComponent', () => {
  let component: IndustryOverviewComponent;
  let fixture: ComponentFixture<IndustryOverviewComponent>;
  let service: IndustryDataService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryOverviewComponent ],
      imports: [ HttpClientTestingModule, NgxChartsModule ],
      providers: [IndustryDataService]
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
      const dummyData = [
        {"year":"2008","period":"M13","periodName":"Annual","value":"3468","footnotes":[{}]},
        {"year":"2008","period":"M12","periodName":"December","value":"436","footnotes":[{}]},
        {"year":"2008","period":"M11","periodName":"November","value":"427","footnotes":[{}]},
        {"year":"2008","period":"M10","periodName":"October","value":"354","footnotes":[{}]},
        {"year":"2008","period":"M09","periodName":"September","value":"263","footnotes":[{}]},
        {"year":"2008","period":"M08","periodName":"August","value":"273","footnotes":[{}]},
        {"year":"2008","period":"M07","periodName":"July","value":"243","footnotes":[{}]},
        {"year":"2008","period":"M06","periodName":"June","value":"223","footnotes":[{}]},
        {"year":"2008","period":"M05","periodName":"May","value":"209","footnotes":[{}]},
        {"year":"2008","period":"M04","periodName":"April","value":"248","footnotes":[{}]},
        {"year":"2008","period":"M03","periodName":"March","value":"224","footnotes":[{}]},
        {"year":"2008","period":"M02","periodName":"February","value":"211","footnotes":[{}]},
        {"year":"2008","period":"M01","periodName":"January","value":"357","footnotes":[{}]}
      ];

    component.generateGraphs()

  });

  it('should call getSecondData', () => {
    const dummyData = [
        {"year":"2008","period":"M13","periodName":"Annual","value":"3468","footnotes":[{}]},
        {"year":"2008","period":"M12","periodName":"December","value":"436","footnotes":[{}]},
        {"year":"2008","period":"M11","periodName":"November","value":"427","footnotes":[{}]},
        {"year":"2008","period":"M10","periodName":"October","value":"354","footnotes":[{}]},
        {"year":"2008","period":"M09","periodName":"September","value":"263","footnotes":[{}]},
        {"year":"2008","period":"M08","periodName":"August","value":"273","footnotes":[{}]},
        {"year":"2008","period":"M07","periodName":"July","value":"243","footnotes":[{}]},
        {"year":"2008","period":"M06","periodName":"June","value":"223","footnotes":[{}]},
        {"year":"2008","period":"M05","periodName":"May","value":"209","footnotes":[{}]},
        {"year":"2008","period":"M04","periodName":"April","value":"248","footnotes":[{}]},
        {"year":"2008","period":"M03","periodName":"March","value":"224","footnotes":[{}]},
        {"year":"2008","period":"M02","periodName":"February","value":"211","footnotes":[{}]},
        {"year":"2008","period":"M01","periodName":"January","value":"357","footnotes":[{}]}
      ];

    //  let firstSpy = spyOn(component['industryDataService'], 'getAnnualWeeklyData').and.returnValue(of(dummyData))

      component.getSecondData('test', 'tester', '2008', '2008', 'multi');

    //  expect(firstSpy).toHaveBeenCalled();

      component.getSecondData('test', 'tester', '2008', '2008', 'multi2');

    //  expect(firstSpy).toHaveBeenCalled();
  });

  it('should call getThirdData', () => {
    const dummyData = [
        {"year":"2008","period":"M13","periodName":"Annual","value":"3468","footnotes":[{}]},
        {"year":"2008","period":"M12","periodName":"December","value":"436","footnotes":[{}]},
        {"year":"2008","period":"M11","periodName":"November","value":"427","footnotes":[{}]},
        {"year":"2008","period":"M10","periodName":"October","value":"354","footnotes":[{}]},
        {"year":"2008","period":"M09","periodName":"September","value":"263","footnotes":[{}]},
        {"year":"2008","period":"M08","periodName":"August","value":"273","footnotes":[{}]},
        {"year":"2008","period":"M07","periodName":"July","value":"243","footnotes":[{}]},
        {"year":"2008","period":"M06","periodName":"June","value":"223","footnotes":[{}]},
        {"year":"2008","period":"M05","periodName":"May","value":"209","footnotes":[{}]},
        {"year":"2008","period":"M04","periodName":"April","value":"248","footnotes":[{}]},
        {"year":"2008","period":"M03","periodName":"March","value":"224","footnotes":[{}]},
        {"year":"2008","period":"M02","periodName":"February","value":"211","footnotes":[{}]},
        {"year":"2008","period":"M01","periodName":"January","value":"357","footnotes":[{}]}
      ];

    //  let firstSpy = spyOn(component['industryDataService'], 'getAnnualData').and.returnValue(of(dummyData))

      component.getThirdData('tester', '2008', '2008', 'multi');

    //  expect(firstSpy).toHaveBeenCalled();

      component.getThirdData('tester', '2008', '2008', 'multi2');

    //  expect(firstSpy).toHaveBeenCalled();
  });
});
