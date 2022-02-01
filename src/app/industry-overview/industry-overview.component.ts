import { Component, OnInit } from '@angular/core';
import { IndustryDataService } from '../service/industry-data.service';

@Component({
  selector: 'app-industry-overview',
  templateUrl: './industry-overview.component.html',
  styleUrls: ['./industry-overview.component.css']
})
export class IndustryOverviewComponent implements OnInit {
  
  testData: any;

  constructor(private industryDataService: IndustryDataService) { }

  ngOnInit(): void {
      this.industryDataService.getGeneralData().subscribe(res => {
          this.testData = res;
      })
      console.log('here!');
      console.log(this.testData);
  }

}
