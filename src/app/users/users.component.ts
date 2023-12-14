import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FilterService } from '../service/filter.Service';
import { UserService } from '../service/UserService';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements AfterViewInit {
  displayedColumns = ['fullname', 'email', 'group'];
  dataSource = new MatTableDataSource<Page>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterValue: string="";

  constructor(private userService: UserService,private filterService:FilterService) {}

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
    this.userService.user().subscribe((data: any) => {
      this.dataSource.data = data; // Assuming data is an array of user objects
    });
  }


}

interface Page {
  fullname: string;
  email: string;
  group: string;
}
