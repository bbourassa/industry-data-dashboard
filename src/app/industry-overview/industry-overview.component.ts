import { Component, OnInit } from '@angular/core';
import { IndustryDataService } from '../service/industry-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataMappings } from '../datamapping';


@Component({
  selector: 'app-industry-overview',
  templateUrl: './industry-overview.component.html',
  styleUrls: ['./industry-overview.component.css']
})
export class IndustryOverviewComponent implements OnInit {

    noGenerate = true;

    dataMappings = new DataMappings();

    industries: any[] = Object.keys(this.dataMappings.stateAreaIndustryCode);

    states: any[] = Object.keys(this.dataMappings.stateCode)

    measurements: any[] = Object.keys(this.dataMappings.measurementCode);

    selectedInfo = {'Industry': 'Select an Industry', 'State': 'Select a State', 'Year': 'Select a Year'}

    multi: any[] = [];

    multi2: any[] = [];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private industryDataService: IndustryDataService) { }

  ngOnInit(): void {
  }

  checkGenerate(): void {
    let selectObj = Object.values(this.selectedInfo).filter(s => s.includes('Select'));
    if(selectObj.length > 0) {
        this.noGenerate = true;
    } else {
        this.noGenerate = false;
    }
  }

  setStateRadar(graphInfo: any, dataPoint: any) {
      let annualData = graphInfo[0]
      this.multi[0].series.push({'name': dataPoint, 'value': annualData.value})
  }

  setCountryRadar(graphInfo: any, dataPoint: any) {
    let annualData = graphInfo[0]
    this.multi2[0].series.push({'name': dataPoint, 'value': annualData.value})
  }

  generateGraphs(): void {
      this.multi = [];
      this.multi2 = [];

      this.multi.push({'name': this.selectedInfo.Industry, 'series': []})
      this.multi2.push({'name': this.selectedInfo.Industry, 'series': []})

      let year = this.selectedInfo.Year
      let stateCode = this.dataMappings.stateCode[this.selectedInfo.State]
      let stateAreaIndustry = this.dataMappings.stateAreaIndustryCode[this.selectedInfo.Industry]
      let jobOpeningIndustry = this.dataMappings.jobOpeningIndustryCode[this.selectedInfo.Industry]

      let empSeriesID = 'ENU' + stateCode + '1' + this.dataMappings.sizeCode + this.dataMappings.ownershipCode + stateAreaIndustry

      let weeklyWageID = 'ENU' + stateCode + '4' + this.dataMappings.sizeCode + this.dataMappings.ownershipCode + stateAreaIndustry

      let annualPayID = 'ENU' + stateCode + '5' + this.dataMappings.sizeCode + this.dataMappings.ownershipCode + stateAreaIndustry

      let jobOpeningID = 'JTU' + jobOpeningIndustry + '000000000' + 'JO' + 'L'

      let hiresID = 'JTU' + jobOpeningIndustry + '000000000' + 'HI' + 'L'

      let layoffID = 'JTU' + jobOpeningIndustry + '000000000' + 'LD' + 'L'

      this.industryDataService.getAnnualData(empSeriesID, year, year).subscribe(res => {
        console.log(JSON.parse(res))
        this.setStateRadar(JSON.parse(res), 'Number of Employees')
        this.industryDataService.getAnnualData(weeklyWageID, year, year).subscribe(res => {
            console.log(JSON.parse(res))
            this.setStateRadar(JSON.parse(res), 'Average Weekly Wage')
            this.industryDataService.getAnnualData(annualPayID, year, year).subscribe(res => {
                console.log(JSON.parse(res))
                this.setStateRadar(JSON.parse(res), 'Average Annual Pay')
                console.log(this.multi)
                this.multi = [...this.multi]
            })
        })

      });

      this.industryDataService.getAnnualData(jobOpeningID, year, year).subscribe(res => {
        console.log(JSON.parse(res))
        this.setCountryRadar(JSON.parse(res), 'Job Openings')
        this.industryDataService.getAnnualData(hiresID, year, year).subscribe(res => {
            console.log(JSON.parse(res))
            this.setCountryRadar(JSON.parse(res), 'Hires')
            this.industryDataService.getAnnualData(layoffID, year, year).subscribe(res => {
                console.log(JSON.parse(res))
                this.setCountryRadar(JSON.parse(res), 'Layoffs & Discharges')
                this.multi2 = [...this.multi2]
            })
        })

      });
  }

//  onSelect(event) {
//    console.log(event);
//  }
}
