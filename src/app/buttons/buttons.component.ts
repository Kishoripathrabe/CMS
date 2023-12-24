import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { NewItemDialogComponent } from '../new-item-dialog/new-item-dialog.component';
import { UserService } from '../service/UserService';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  constructor(public dialog: MatDialog,private userService:UserService,private snackBar: MatSnackBar){

  }
  addObject(){
    
     this.dialog.open(NewItemDialogComponent, {
      width: '100%', // Set the width to 100%
      panelClass: 'full-screen-dialog', // Apply a custom CSS class
      data:{action:"addObj"}
    });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }
  editSelected(){
    let res=this.userService.getSelectedData()
      console.log(res,"waste")
      if(res.length>1 || res.length==0){
        this.snackBar.open("Select Only One", "Dismiss",{
          duration: 2000, // Duration in milliseconds (adjust as needed)
          horizontalPosition: 'center', // Position: 'start', 'center', 'end'
          verticalPosition: 'top', // Position: 'top', 'bottom'
        });      
      }else{
        this.dialog.open(NewItemDialogComponent, {
          width: '100%', // Set the width to 100%
          panelClass: 'full-screen-dialog', // Apply a custom CSS class
          data:{...res[0],action:"editObj"}
        });
      }

    


  }
  deleteSelected(){
    
  }
}
