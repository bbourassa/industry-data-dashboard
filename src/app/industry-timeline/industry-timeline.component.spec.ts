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
  });

  it('should checkGenerate for when there is 1 row', () => {
    component.noState = true;
    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Select a State', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]

    component.checkGenerate();
    expect(component.noGenerateGraph).toBeFalse();

    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Alabama', 'StartYear': 'Select a Year', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]

    component.checkGenerate();
    expect(component.noGenerateGraph).toBeTrue();

    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]

    component.checkGenerate();
    expect(component.noGenerateGraph).toBeFalse();
  });

  it('should checkGenerate for when there is 2 rows', () => {
    component.noState = true;
    component.addRow();
    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Select a State', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]

    component.checkGenerate();
    expect(component.noGenerateGraph).toBeFalse();

    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': 'Select a Year', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]

    component.checkGenerate();
    expect(component.noGenerateGraph).toBeTrue();

    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]

     component.checkGenerate();
     expect(component.noGenerateGraph).toBeFalse();
  });

  it('should checkGenerate for when there is 3 rows', () => {
    component.noState = true;
    component.addRow();
    component.addRow();
    
    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Select a State', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]

    component.checkGenerate();
    expect(component.noGenerateGraph).toBeFalse();

    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': 'Select a Year', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]

    component.checkGenerate();
    expect(component.noGenerateGraph).toBeTrue();

    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]

     component.checkGenerate();
     expect(component.noGenerateGraph).toBeFalse();
  });

  it('should checkGenerate for when there is 4 rows', () => {
    component.noState = true;
    component.addRow();
    component.addRow();
    component.addRow();
    
    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Select a State', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]

    component.checkGenerate();
    expect(component.noGenerateGraph).toBeFalse();

    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': 'Select a Year', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]
    component.checkGenerate();
    expect(component.noGenerateGraph).toBeTrue();

    component.selectedInfo = [{'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}, {'Industry': 'Construction', 'State': 'Alabama', 'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees'}]

     component.checkGenerate();
     expect(component.noGenerateGraph).toBeFalse();
  });

  it('should formatData for Hires, Job Openings, and Layoffs & Discharges', () => {
    const dummyData = [
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
      
      component.selectedInfo[0].Measurement = 'Hires'
      component.selectedInfo[0].Industry = 'Construction'
      component.formatData(dummyData, 0)
      expect(component.multi[0].name).toEqual('Construction')
      expect(component.multi[0].series.length).toEqual(12)

      component.selectedInfo[0].Measurement = 'Job Openings'
      component.multi = [];
      component.formatData(dummyData, 0)
      expect(component.multi[0].name).toEqual('Construction')
      expect(component.multi[0].series.length).toEqual(12)

      component.selectedInfo[0].Measurement = 'Layoffs & Discharges'
      component.multi = [];
      component.formatData(dummyData, 0)
      expect(component.multi[0].name).toEqual('Construction')
      expect(component.multi[0].series.length).toEqual(12)
  });

  it('should formatData for Number of Employees, Weekly Wage, and Annual Pay', () => {
    const dummyData = [
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
      
      component.selectedInfo[0].Measurement = 'Number of Employees'
      component.selectedInfo[0].Industry = 'Construction'
      component.selectedInfo[0].State = 'Alabama'
      component.formatData(dummyData, 0)
      expect(component.multi[0].name).toEqual('Construction - Alabama');
      expect(component.multi[0].series.length).toEqual(12)

      component.selectedInfo[0].Measurement = 'Weekly Wage'
      component.multi = [];
      component.formatData(dummyData, 0)
      expect(component.multi[0].name).toEqual('Construction - Alabama');
      expect(component.multi[0].series.length).toEqual(12)

      component.selectedInfo[0].Measurement = 'Annual Pay'
      component.multi = [];
      component.formatData(dummyData, 0)
      expect(component.multi[0].name).toEqual('Construction - Alabama');
      expect(component.multi[0].series.length).toEqual(12)
  });

  it('should formatSeriesID for Hires, Job Openings, and Layoffs & Discharges', () => {
      component.selectedInfo[0].Industry = 'Construction'

      expect(component.formatSeriesID('HI', 0)).toEqual('JTU230000000000000HIL')

      expect(component.formatSeriesID('JO', 0)).toEqual('JTU230000000000000JOL')

      expect(component.formatSeriesID('LD', 0)).toEqual('JTU230000000000000LDL')
  });

  it('should formatSeriesID for Number of Employees, Weekly Wages, and Annual Pay', () => {
    component.selectedInfo[0].Industry = 'Construction'

    expect(component.formatSeriesID('1', 0)).toEqual('ENUUS00010523')

    component.selectedInfo[0].State = 'Alabama'

    expect(component.formatSeriesID('4', 0)).toEqual('ENU0100040523')

    component.selectedInfo[0].State = 'Alaska'

    expect(component.formatSeriesID('5', 0)).toEqual('ENU0200050523')
  });

  it('should getQueryInfo', () => {
      component.selectedInfo[0] = {'StartYear': '2007', 'EndYear': '2008', 'Measurement': 'Number of Employees', 'Industry': 'Construction', 'State': 'Alabama'}

      expect(component.getQueryInfo(component.selectedInfo[0])).toEqual({'startYear': '2007', 'endYear': '2008', 'measurement': '1'})
  });

  it('should sortData when there are 2 rows', () => {
        component.multi = [{
            'index': 0,
            'name': 'Manufacturing',
            'series': [{name: 'January 2009', value: 297653}, 
            {name: 'February 2009', value: 297737}, 
            {name: 'March 2009', value: 297477},
            {name: 'April 2009', value: 296193},
            {name: 'May 2009', value: 296094},
            {name: 'January 2010', value: 291231},
            {name: 'February 2010', value: 289882},
            {name: 'March 2010', value: 289008},
            {name: 'April 2010', value: 288186},
            {name: 'May 2010', value: 287804}]
        },
        {
            'index': 1,
            'name': 'Manufacturing',
            'series': [{name: 'January 2007', value: 297653}, 
            {name: 'February 2007', value: 297737}, 
            {name: 'March 2007', value: 297477},
            {name: 'April 2007', value: 296193},
            {name: 'May 2007', value: 296094},
            {name: 'January 2008', value: 291231},
            {name: 'February 2008', value: 289882},
            {name: 'March 2008', value: 289008},
            {name: 'April 2008', value: 288186},
            {name: 'May 2008', value: 287804}]
        }
      ];

      component.sortData(1);

      expect(component.multi[0].index).toEqual(1);
      expect(component.multi[1].index).toEqual(0);
  });

  it('should sortData when there are 3 rows', () => {
      component.multi = [{
        'index': 0,
        'name': 'Manufacturing',
        'series': [{name: 'January 2009', value: 297653}, 
        {name: 'February 2014', value: 297737}, 
        {name: 'March 2014', value: 297477},
        {name: 'April 2014', value: 296193},
        {name: 'May 2014', value: 296094},
        {name: 'January 2013', value: 291231},
        {name: 'February 2013', value: 289882},
        {name: 'March 2013', value: 289008},
        {name: 'April 2013', value: 288186},
        {name: 'May 2013', value: 287804}]
      },
      {
        'index': 1,
        'name': 'Manufacturing',
        'series': [{name: 'January 2007', value: 297653}, 
        {name: 'February 2007', value: 297737}, 
        {name: 'March 2007', value: 297477},
        {name: 'April 2007', value: 296193},
        {name: 'May 2007', value: 296094},
        {name: 'January 2008', value: 291231},
        {name: 'February 2008', value: 289882},
        {name: 'March 2008', value: 289008},
        {name: 'April 2008', value: 288186},
        {name: 'May 2008', value: 287804}]
      },
      {
        'index': 2,
        'name': 'Manufacturing',
        'series': [{name: 'January 2008', value: 297653}, 
        {name: 'February 2008', value: 297737}, 
        {name: 'March 2008', value: 297477},
        {name: 'April 2008', value: 296193},
        {name: 'May 2008', value: 296094},
        {name: 'January 2009', value: 291231},
        {name: 'February 2009', value: 289882},
        {name: 'March 2009', value: 289008},
        {name: 'April 2009', value: 288186},
        {name: 'May 2009', value: 287804}]
      }
    ];

    component.sortData(2);

    expect(component.multi[0].index).toEqual(1);
    expect(component.multi[1].index).toEqual(2);
    expect(component.multi[2].index).toEqual(0);
  });

  it('should sortData when there are 3 rows', () => {
    component.multi = [{
      'index': 0,
      'name': 'Manufacturing',
      'series': [{name: 'January 2009', value: 297653}, 
      {name: 'February 2014', value: 297737}, 
      {name: 'March 2014', value: 297477},
      {name: 'April 2014', value: 296193},
      {name: 'May 2014', value: 296094},
      {name: 'January 2013', value: 291231},
      {name: 'February 2013', value: 289882},
      {name: 'March 2013', value: 289008},
      {name: 'April 2013', value: 288186},
      {name: 'May 2013', value: 287804}]
    },
    {
      'index': 1,
      'name': 'Manufacturing',
      'series': [{name: 'January 2007', value: 297653}, 
      {name: 'February 2007', value: 297737}, 
      {name: 'March 2007', value: 297477},
      {name: 'April 2007', value: 296193},
      {name: 'May 2007', value: 296094},
      {name: 'January 2008', value: 291231},
      {name: 'February 2008', value: 289882},
      {name: 'March 2008', value: 289008},
      {name: 'April 2008', value: 288186},
      {name: 'May 2008', value: 287804}]
    },
    {
      'index': 2,
      'name': 'Manufacturing',
      'series': [{name: 'January 2008', value: 297653}, 
      {name: 'February 2010', value: 297737}, 
      {name: 'March 2010', value: 297477},
        {name: 'April 2010', value: 296193},
        {name: 'May 2010', value: 296094},
        {name: 'January 2011', value: 291231},
        {name: 'February 2011', value: 289882},
        {name: 'March 2011', value: 289008},
        {name: 'April 2011', value: 288186},
        {name: 'May 2011', value: 287804}]
    },
    {
        'index': 3,
        'name': 'Manufacturing',
        'series': [{name: 'January 2008', value: 297653}, 
        {name: 'February 2008', value: 297737}, 
        {name: 'March 2008', value: 297477},
          {name: 'April 2008', value: 296193},
          {name: 'May 2008', value: 296094},
          {name: 'January 2009', value: 291231},
          {name: 'February 2009', value: 289882},
          {name: 'March 2009', value: 289008},
          {name: 'April 2009', value: 288186},
          {name: 'May 2009', value: 287804}]
    }
    ];

    component.sortData(3);

    expect(component.multi[0].index).toEqual(1);
    expect(component.multi[1].index).toEqual(3);
    expect(component.multi[2].index).toEqual(2);
    expect(component.multi[3].index).toEqual(0); 
  });

  it('should generateFourthTimeline', () => {
    component.generateFourthTimeline();
    //TODO
  });

  it('should generateThirdTimeline', () => {
    component.generateThirdTimeline();
    //TODO
  });

  it('should generateSecondTimeline', () => {
    component.generateSecondTimeline();
    //TODO
  });

  it('should generateGraph', () => {
      component.generateGraph();
      //TODO
  })
});
