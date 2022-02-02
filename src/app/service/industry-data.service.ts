import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class IndustryDataService {

  // Node/Express API
  
  REST_API: string = 'https://industry-data-dashboard.herokuapp.com/api';
//  REST_API: string = 'http://localhost:8000/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  surveyCode = {'State and Area': 'SMU', 'Job Openings and Labor Turnover': 'JTU'};

  stateCode = {'Alabama': '01', 'Alaska': '02', 'Arizona': '03', 'Arkansas': '04', 'California': '06', 'Colorado': '08', 'Connecticut': '09', 'Delaware': '10', 'District of Columbia': '11', 'Florida': '12', 'Georgia': '13', 'Hawaii': '15', 'Idaho': '16', 'Illinois': '17', 'Indiana': '18', 'Iowa': '19', 'Kansas': '20', 'Kentucky': '21', 'Louisiana': '22', 'Maine': '23', 'Maryland': '24','Massachusetts': '25', 'Michigan': '26', 'Minnesota': '27', 'Mississippi': '28', 'Missouri': '29', 'Montana': '30', 'Nebraska': '31', 'Nevada': '32', 'New Hampshire': '33', 'New Jersey': '34', 'New Mexico': '35', 'New York': '36', 'North Carolina': '37', 'North Dakota': '38', 'Ohio': '39', 'Oklahoma': '40', 'Oregon': '41', 'Pennsylvania': '42', 'Rhode Island': '44', 'South Carolina': '45', 'South Dakota': '46', 'Tennessee': '47', 'Texas': '48', 'Utah': '49', 'Vermont': '50', 'Virginia': '51', 'Washington': '53', 'West Virginia': '54', 'Wisconsin': '55', 'Wyoming': '56'};

  areaCode = '0000';

  stateAreaIndustryCode = {'Total Nonfarm': '00000000', 'Total Private': '05000000', 'Mining and Logging': '10000000', 'Construction': '20000000', 'Manufacturing': '30000000', 'Trade, Transportation, and Utilities': '40000000', 'Wholesale Trade': '41000000', 'Retail Trade': '42000000', 'Transportation, Warehousing, and Utilities': '43000000', 'Information': '50000000', 'Financial Activities': '55000000', 'Finance and Insurance': '55520000', 'Real Estate and Rental and Leasing': '55530000', 'Professional and Business Services': '60000000', 'Education and Health Services': '65000000', 'Educational Services': '65610000', 'Health Care and Social Assistance': '65620000', 'Leisure and Hospitality': '70000000', 'Arts, Entertainment, and Recreation': '70710000', 'Accommodation and Food Services': '70720000', 'Other Services': '80000000', 'Government': '90000000'};

  jobOpeningIndustryCode = {'Total Nonfarm': '000000', 'Total Private': '100000', 'Mining and Logging': '110099', 'Construction': '230000', 'Manufacturing': '300000', 'Trade, Transportation, and Utilities': '400000', 'Wholesale Trade': '420000', 'Retail Trade': '440000', 'Transportation, Warehousing, and Utilities': '480099', 'Information': '510000', 'Financial Activities': '510099', 'Finance and Insurance': '520000', 'Real Estate and Rental and Leasing': '530000', 'Professional and Business Services': '540099', 'Education and Health Services': '600000', 'Educational Services': '610000', 'Health Care and Social Assistance': '620000', 'Leisure and Hospitality': '700000', 'Arts, Entertainment, and Recreation': '710000', 'Accommodation and Food Services': '720000', 'Other Services': '810000', 'Government': '900000'};

  stateAreaMeasurementCode = {'All Employees': '01', 'Average Weekly Hours': '02', 'Average Hourly Earnings of All Employees': '03', 'Average Weekly Earnings of All Employees': '11'};

  jobOpeningMeasurementCode = {'Hires': 'HI', 'Job Openings': 'JO', 'Unemployment rate': 'UN', 'Unemployed persons per job opening ratio': 'UO'}



  constructor(private httpClient: HttpClient) { }

  getGeneralData(): Observable<any> {
    let seriesId = 'SMU25000000600000002';
    let startyear = '2008';  
    let endyear = '2008';
    let API_URL = `${this.REST_API}/industry/${seriesId}/${startyear}/${endyear}`;
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
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}