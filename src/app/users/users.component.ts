import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FilterService } from '../service/filter.Service';
import { UserService } from '../service/UserService';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements AfterViewInit {
  displayedColumns = ['select','fullname', 'email', 'group'];
  dataSource = new MatTableDataSource<Page>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filterValue: string="";
  cPno: any;
  selection = new SelectionModel<Page>(true, []);
  constructor(private userService: UserService,private filterService:FilterService,private http:HttpClient) {}

   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // if there is a selection then clear that selection
    if (this.isSomeSelected()) {
      this.selection.clear();
    } else {
      this.isAllSelected()
        ? this.selection.clear()
        : this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  isSomeSelected() {
    return this.selection.selected.length > 0;
  }
  getSelectedRows(): any[] {
    this.userService.setSelectedData(this.selection.selected);
    return this.selection.selected;
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.setupFilter();
    this.paginator.page.subscribe((page) => {
      this.cPno=page.pageIndex + 1;
      console.log('Current Page:', this.cPno);
    });
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
      console.log("🚀 ~ file: users.component.ts:40 ~ UsersComponent ~ this.userService.user ~ data:", data)
      this.dataSource.data = data; // Assuming data is an array of user objects
    });
  }

  edit(obj:any){
    this.userService.deletemark([obj]);
  }
  deletebyservice(arr:any){
    this.userService.deletemark(arr);
  }

}

interface Page {
  fullname: string;
  email: string;
  group: string;
}
