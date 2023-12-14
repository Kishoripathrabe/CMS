import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { dashboardService } from "../service/dashboard.Service"
import { FilterService } from '../service/filter.Service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements AfterViewInit {

  displayedColumns = ['title', 'category', 'author'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterValue: string="";

  constructor(private dashboardService: dashboardService,private filterService:FilterService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.setupFilter();

  }

  setupFilter() {
    this.filterService.getFiltervalue().subscribe((filterValue) => {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.dashboardService.getpages().subscribe((data: any) => {
      this.dataSource.data = data; // Assuming data is an array of Page objects
    });
  }
}
