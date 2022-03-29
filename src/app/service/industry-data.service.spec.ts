import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { IndustryDataService } from './industry-data.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('IndustryDataService', () => {
  let service: IndustryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(IndustryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getGeneralData', () => {
      service.getGeneralData('JTU110099000000000HIL', '2008', '2009')
      //TODO: TEST RES
  });

  it('should getAnnualData', () => {
      service.getAnnualData('JTU110099000000000HIL', '2008', '2009')
      //TODO: TEST RES
  })

  it('should handleError', () => {
      let testResponse = new HttpErrorResponse({error: 'not found', status: 404})
      service.handleError(testResponse)
      //TODO: COVER LINE 72
  })
});
