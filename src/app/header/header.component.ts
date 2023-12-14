// header.component.ts

import { Component, OnInit } from '@angular/core';
import { dashboardService } from '../service/dashboard.Service';
import { FilterService } from '../service/filter.Service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  showMyAccountDropdown: boolean = false;
  data: any;
  filterValue:any;
  constructor(private dashoardservice: dashboardService,private filterService:FilterService) {
    this.getdashboard();
    this.filterService.getresetFilter().subscribe(data=>{
      console.log("reset called")
      this.filterValue=""
    })
   }

   myfn(){
    this.filterService.setFilterValue(this.filterValue)
   }
   resetfv(){
    this.filterValue=""
   }

  ngOnInit(): void {
  }

  getdashboard() {
    this.dashoardservice.dashboardData().subscribe(data => {
      this.data = data;
    })
  }
  // search(): void {
  //   // Add search logic based on the searchQuery
  // }

  // toggleMyAccountDropdown(): void {
  //   this.showMyAccountDropdown = !this.showMyAccountDropdown;
  // }

  logout(): void {
  }
}
