import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-new-item-dialog',
  templateUrl: './new-item-dialog.component.html',
  styleUrls: ['./new-item-dialog.component.css']
})
export class NewItemDialogComponent {
   newItemName: any;
   formGroup: FormGroup;
   selectedGroup: string = 'admin';
  constructor(private http:HttpClient,@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<NewItemDialogComponent>
  ){
    this.formGroup = new FormGroup({
      full_name: new FormControl(data.full_name?data.full_name:'', [Validators.required]),
      email: new FormControl(data.email?data.email:'', [Validators.required])
    })
    this.selectGroup=data.group?data.group:"admin"
  }
  selectGroup(group: string) {
    this.selectedGroup = group;
  }
  saveNewItem(){
    if (this.formGroup.valid) {
      let result={...this.formGroup.value,group:this.selectedGroup}
      console.log('Form submitted:', result);
  
this.fetchDataAndAddNewUser(result)
    // this.http.post("https://onlineshoppingapi-default-rtdb.firebaseio.com/users.json",result).subscribe(data=>{
    //   console.log("success done")
    // })
  }
}

fetchDataAndAddNewUser(result:any): void {
  this.http.get<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/users.json')
    .subscribe(data => {
      
        // Convert the received object into an array
        let oldusers = data?Object.keys(data).map(key => data[key]):[];

        // Add the new data to the array
        // const newIndex = oldusers.length;
        const newData = result
        oldusers.push(newData);

        // Store the updated array back in Firebase
        const updatedData:any = {};
        oldusers.forEach((user, index) => {
          updatedData[index.toString()] = user;
        });

        this.http.put('https://onlineshoppingapi-default-rtdb.firebaseio.com/users.json', updatedData)
          .subscribe(() => {
            console.log('Data updated successfully');
          }, error => {
            console.error('Error updating data:', error);
          });
      
    });
}

closeBox(){
  this.dialogRef.close()
}


}
