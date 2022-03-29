import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Obj } from '@popperjs/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DataMappings } from '../datamapping';
import { IndustryDataService } from '../service/industry-data.service';

@Component({
  selector: 'app-industry-timeline',
  templateUrl: './industry-timeline.component.html',
  styleUrls: ['./industry-timeline.component.css']
})
export class IndustryTimelineComponent implements OnInit {

  dataMappings = new DataMappings();

  noIndustryAdd = false;
  noIndustryRemove = true;
  noGenerateGraph = true;
  noState = true;

  selectedInfo = [{'Industry': 'Select an Industry', 'State': 'Select a State', 'StartYear': 'Select a Start Year', 'EndYear': 'Select an End Year', 'Measurement': 'Select a Measurement'}, {'Industry': 'Select an Industry', 'State': 'Select a State', 'StartYear': 'Select a Start Year', 'EndYear': 'Select an End Year', 'Empty': 'empty'}, {'Industry': 'Select an Industry', 'State': 'Select a State', 'StartYear': 'Select a Start Year', 'EndYear': 'Select an End Year', 'Empty': 'empty'}, {'Industry': 'Select an Industry', 'State': 'Select a State', 'StartYear': 'Select a Start Year', 'EndYear': 'Select an End Year', 'Empty': 'empty'}]

  items!: any[];

  multi: any[] = []

  industries: any[] = Object.keys(this.dataMappings.stateAreaIndustryCode);

  states: any[] = Object.keys(this.dataMappings.stateCode)

  measurements: any[] = Object.keys(this.dataMappings.measurementCode);

  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = '';
  timeline: boolean = true;

  constructor(private industryDataService: IndustryDataService) { 
  }

  ngOnInit(): void {
      this.items = [];
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  addRow(): void {
      if (this.items.length < 1) {
          this.items = [1]
          this.noGenerateGraph = true;
          this.selectedInfo[1].Empty = 'full';
          this.noIndustryRemove = false;
      } else if (this.items.length < 3) {
          this.items.push('1');
          this.selectedInfo[this.items.length].Empty = 'full';
          this.noGenerateGraph = true;
      } 

      if(this.items.length === 3) {
        this.noIndustryAdd = true;
      }
      
  }

  removeRow(): void {
    if(this.items.length <= 1) {
        this.noIndustryRemove = true;
    }
    if(this.items.length <= 3) {
        this.noIndustryAdd = false;
        this.selectedInfo[this.items.length] = {'Industry': 'Select an Industry', 'State': 'Select a State', 'StartYear': 'Select a Start Year', 'EndYear': 'Select an End Year', 'Measurement': 'Select a Measurement'};
        this.checkGenerate()
    }
    this.items.pop();

  }

  checkMeasurement() {
    if(this.selectedInfo[0].Measurement === 'Hires' || this.selectedInfo[0].Measurement === 'Job Openings' || this.selectedInfo[0].Measurement === 'Layoffs & Discharges') {
        this.noState = true;
    } else {
        this.noState = false;
    }
  }

  checkGenerate(): void {
      if(this.items.length >= 0) {
        let selectObjects = Object.values(this.selectedInfo[0]).filter(s => s.includes('Select'));
        if(selectObjects.length > 0) {
            if(selectObjects.length === 1 && selectObjects[0] === 'Select a State' && this.noState === true) {
                this.noGenerateGraph = false;
            } else {
                this.noGenerateGraph = true;
            }
        } else {
            this.noGenerateGraph = false;
        }
      } if (this.items.length >= 1) {
        let selectObjects = Object.values(this.selectedInfo[1]).filter(s => s.includes('Select'));
        if(selectObjects.length > 0) {
            if(selectObjects.length === 1 && selectObjects[0] === 'Select a State' && this.noState === true) {
                this.noGenerateGraph = false;
            } else {
                this.noGenerateGraph = true;
            }
        } else {
            this.noGenerateGraph = false;
        }
      } if (this.items.length >= 2) {
        let selectObjects = Object.values(this.selectedInfo[2]).filter(s => s.includes('Select'));
        if(selectObjects.length > 0) {
            if(selectObjects.length === 1 && selectObjects[0] === 'Select a State' && this.noState === true) {
                this.noGenerateGraph = false;
            } else {
                this.noGenerateGraph = true;
            }
        } else {
            this.noGenerateGraph = false;
        }
      } if (this.items.length >= 3) {
        let selectObjects = Object.values(this.selectedInfo[3]).filter(s => s.includes('Select'));
        if(selectObjects.length > 0) {
            if(selectObjects.length === 1 && selectObjects[0] === 'Select a State' && this.noState === true) {
                this.noGenerateGraph = false;
            } else {
                this.noGenerateGraph = true;
            }
        } else {
            this.noGenerateGraph = false;
        }
      }
  }

  formatData(graphData: any[], index: any) {

    this.multi.push({"name": this.selectedInfo[index].Industry + ' - ' + this.selectedInfo[index].State, "series": [], "index": index})
    let multiIndex = this.multi.find(element => element.index === index)
    for(let i = 0; i < graphData.length; i++) {
        this.multi[multiIndex.index].series.unshift({"name": graphData[i].periodName + ' ' + graphData[i].year, "value": parseFloat(graphData[i].value)})
    }
  }

  formatSeriesID(measurement: string, index: any) {
      let seriesID = ''
      if(measurement === 'HI' || measurement === 'JO' || measurement === 'LD') {
        seriesID = 'JTU' + this.dataMappings.jobOpeningIndustryCode[this.selectedInfo[index].Industry!] + '000000000' + measurement + 'L'
        return seriesID
      } else {
        let stateCode = ''
        if(this.selectedInfo[0].State === 'Select a State') {
            stateCode = 'US000'
        } else {
            stateCode = this.dataMappings.stateCode[this.selectedInfo[index].State]
        }
        seriesID = 'ENU' + stateCode + measurement + this.dataMappings.sizeCode + this.dataMappings.ownershipCode + this.dataMappings.stateAreaIndustryCode[this.selectedInfo[index].Industry!];
          return seriesID
      }
  }

  getQueryInfo(info: any) {
    return {'startYear': info.StartYear, 'endYear': info.EndYear, 'measurement': this.dataMappings.measurementCode[this.selectedInfo[0].Measurement!]}
  }

  generateGraph(): void {
      this.multi = []

      let firstInfo = this.getQueryInfo(this.selectedInfo[0])

      let firstSeriesID = this.formatSeriesID(firstInfo.measurement, 0);

      this.industryDataService.getGeneralData(firstSeriesID, firstInfo.startYear, firstInfo.endYear).subscribe(res => {

           this.yAxisLabel = this.selectedInfo[0].Measurement!

           this.formatData(JSON.parse(res), 0)

           if(this.items.length >= 1) {
            let secondInfo = this.getQueryInfo(this.selectedInfo[1])
            let secondSeriesID = this.formatSeriesID(secondInfo.measurement, 1);
            this.industryDataService.getGeneralData(secondSeriesID, secondInfo.startYear, secondInfo.endYear).subscribe(res => {

                this.yAxisLabel = this.selectedInfo[0].Measurement!
     
                this.formatData(JSON.parse(res), 1)

                if(this.items.length >= 2) {
                    let thirdInfo = this.getQueryInfo(this.selectedInfo[2])
                    let thirdSeriesID = this.formatSeriesID(thirdInfo.measurement, 2);
                      this.industryDataService.getGeneralData(thirdSeriesID, thirdInfo.startYear, thirdInfo.endYear).subscribe(res => {
             
                        this.yAxisLabel = this.selectedInfo[0].Measurement!
             
                        this.formatData(JSON.parse(res), 2)

                        if(this.items.length === 3) {
                            let fourthInfo = this.getQueryInfo(this.selectedInfo[3])
                            let fourthSeriesID = this.formatSeriesID(fourthInfo.measurement, 3);
                    
                              this.industryDataService.getGeneralData(fourthSeriesID, fourthInfo.startYear, fourthInfo.endYear).subscribe(res => {
                     
                                this.yAxisLabel = this.selectedInfo[0].Measurement!
                     
                                this.formatData(JSON.parse(res), 3)
                     
                                let firstDate = this.multi[0].series[0].name
                                let secondDate = this.multi[1].series[0].name
                                let thirdDate = this.multi[2].series[0].name
                                let fourthDate = this.multi[3].series[0].name
                                let sortedDates = [{'index': 0, 'year': new Date(firstDate.substring(firstDate.length-5, firstDate.length))}, {'index': 1, 'year': new Date(secondDate.substring(secondDate.length-5, secondDate.length))}, {'index': 2, 'year': new Date(thirdDate.substring(thirdDate.length-5, thirdDate.length))}, {'index': 3, 'year':new Date(fourthDate.substring(fourthDate.length-5, fourthDate.length))}]
                                sortedDates.sort((a: any, b: any) => (a.year > b.year ? 1 : -1))
                                this.multi = [...this.multi]
                                [this.multi[0], this.multi[1], this.multi[2], this.multi[3]] = [this.multi[sortedDates[0].index], this.multi[sortedDates[1].index], this.multi[sortedDates[2].index], this.multi[sortedDates[3].index]]
                                this.multi = [...this.multi]
                           });
                        } else {
                            let firstDate = this.multi[0].series[0].name
                            let secondDate = this.multi[1].series[0].name
                            let thirdDate = this.multi[2].series[0].name
                            let sortedDates = [{'index': 0, 'year': new Date(firstDate.substring(firstDate.length-5, firstDate.length))}, {'index': 1, 'year': new Date(secondDate.substring(secondDate.length-5, secondDate.length))}, {'index': 2, 'year': new Date(thirdDate.substring(thirdDate.length-5, thirdDate.length))}]
                            sortedDates.sort((a: any, b: any) => (a.year > b.year ? 1 : -1))
                            this.multi = [...this.multi]
                            [this.multi[0], this.multi[1], this.multi[2]] = [this.multi[sortedDates[0].index], this.multi[sortedDates[1].index], this.multi[sortedDates[2].index]]
                            this.multi = [...this.multi]
                        }
             
                   });
                } else {
                    let firstDate = this.multi[0].series[0].name
                    let secondDate = this.multi[1].series[0].name
                    if(new Date(firstDate.substring(firstDate.length-5, firstDate.length)) > new Date(secondDate.substring(secondDate.length-5, secondDate.length))) {
                        [this.multi[0], this.multi[1]] = [this.multi[1], this.multi[0]]
                    }
                    this.multi = [...this.multi]
                }
           });
           } else {
            this.multi = [...this.multi]
            console.log(this.multi[0])
            console.log(this.multi[1])
            console.log(new Date(this.multi[0].series[0].name))
           }

      });
  }

}