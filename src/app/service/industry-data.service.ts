import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DataMappings } from '../datamapping';

@Injectable({
  providedIn: 'root'
})

export class IndustryDataService {

  // Node/Express API
  
  REST_API: string = 'https://industry-data-dashboard.herokuapp.com/api';
//  REST_API: string = 'http://localhost:8000/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  dataMappings = new DataMappings();

  surveyCode = this.dataMappings.surveyCode;

  stateCode = this.dataMappings.stateCode;

//  areaCode = this.dataMappings.areaCode;

  stateAreaIndustryCode = this.dataMappings.stateAreaIndustryCode;

  jobOpeningIndustryCode = this.dataMappings.jobOpeningIndustryCode;

  stateAreaMeasurementCode = this.dataMappings.measurementCode;

  jobOpeningMeasurementCode = this.dataMappings.measurementCode;



  constructor(private httpClient: HttpClient) { }

  getGeneralData(seriesId: string, startYear: string, endYear: string): Observable<any> {
    //console.log(seriesId)
    let seriesID = seriesId;
    //console.log(seriesID, startYear, endYear)
    let API_URL = `${this.REST_API}/industry/${seriesID}/${startYear}/${endYear}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  getAnnualData(seriesId: string, startYear: string, endYear: string): Observable<any> {
    let seriesID = seriesId;
    let API_URL = `${this.REST_API}/annual/${seriesID}/${startYear}/${endYear}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    return throwError(errorMessage);
  }

}