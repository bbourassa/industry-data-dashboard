import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-industry-homepage',
  templateUrl: './industry-homepage.component.html',
  styleUrls: ['./industry-homepage.component.css']
})
export class IndustryHomepageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  rerouteToOverview(): void {
    this.router.navigateByUrl('overview')
  }

}
