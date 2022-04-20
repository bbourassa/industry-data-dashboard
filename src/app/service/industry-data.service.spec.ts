import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { IndustryDataService } from './industry-data.service';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

describe('IndustryDataService', () => {
  let injector: TestBed;
  let service: IndustryDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [IndustryDataService]
    });
    injector = getTestBed();
    service = TestBed.inject(IndustryDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getGeneralData', () => {
      const dummyData = [
          {"year":"2009","period":"M12","periodName":"December","value":"42999","footnotes":[{}]},
          {"year":"2009","period":"M11","periodName":"November","value":"41982","footnotes":[{}]},
          {"year":"2009","period":"M10","periodName":"October","value":"41703","footnotes":[{}]},
          {"year":"2009","period":"M09","periodName":"September","value":"41521","footnotes":[{}]},
          {"year":"2009","period":"M08","periodName":"August","value":"36659","footnotes":[{}]},
          {"year":"2009","period":"M07","periodName":"July","value":"37066","footnotes":[{}]},
          {"year":"2009","period":"M06","periodName":"June","value":"41047","footnotes":[{}]},
          {"year":"2009","period":"M05","periodName":"May","value":"40822","footnotes":[{}]},
          {"year":"2009","period":"M04","periodName":"April","value":"39442","footnotes":[{}]},
          {"year":"2009","period":"M03","periodName":"March","value":"40493","footnotes":[{}]},
          {"year":"2009","period":"M02","periodName":"February","value":"40190","footnotes":[{}]},
          {"year":"2009","period":"M01","periodName":"January","value":"40160","footnotes":[{}]},
          {"year":"2008","period":"M12","periodName":"December","value":"42148","footnotes":[{}]},
          {"year":"2008","period":"M11","periodName":"November","value":"40800","footnotes":[{}]},
          {"year":"2008","period":"M10","periodName":"October","value":"40380","footnotes":[{}]},
          {"year":"2008","period":"M09","periodName":"September","value":"40433","footnotes":[{}]},
          {"year":"2008","period":"M08","periodName":"August","value":"36230","footnotes":[{}]},
          {"year":"2008","period":"M07","periodName":"July","value":"37114","footnotes":[{}]},
          {"year":"2008","period":"M06","periodName":"June","value":"40737","footnotes":[{}]},
          {"year":"2008","period":"M05","periodName":"May","value":"40334","footnotes":[{}]},
          {"year":"2008","period":"M04","periodName":"April","value":"39927","footnotes":[{}]},
          {"year":"2008","period":"M03","periodName":"March","value":"39362","footnotes":[{}]},
          {"year":"2008","period":"M02","periodName":"February","value":"39205","footnotes":[{}]},
          {"year":"2008","period":"M01","periodName":"January","value":"38969","footnotes":[{}]}
        ];

      const seriesID = 'JTU110099000000000HIL';
      const startYear = '2008'
      const endYear = '2009'

      service.getGeneralData(seriesID, startYear, endYear).subscribe(data => {
          expect(data.length).toBe(24);
          expect(data).toEqual(dummyData);
      });

      const req = httpMock.expectOne(`${service.REST_API}/industry/${seriesID}/${startYear}/${endYear}`)

      expect(req.request.method).toBe('GET');
      req.flush(dummyData);
  });

  it('should getAnnualData', () => {
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

    const seriesID = 'JTU110099000000000HIL';
    const startYear = '2008'
    const endYear = '2008'

    service.getAnnualData(seriesID, startYear, endYear).subscribe(data => {
        expect(data.length).toBe(13);
        expect(data).toEqual(dummyData);
    })
  
  
    const req = httpMock.expectOne(`${service.REST_API}/annual/${seriesID}/${startYear}/${endYear}`)
  
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should handleError', () => {
      const dummyParams = new HttpErrorResponse({status: 400, statusText: 'Bad Request'});

      service.handleError(dummyParams).subscribe(() => {}, err => {
        console.log(err)
        expect(err).toEqual('Error Code: 400\nMessage: Http failure response for (unknown url): 400 Bad Request')
      });
      
      const req = httpMock.expectNone(`${service.REST_API}/industry/${dummyParams}`)
  })
});
