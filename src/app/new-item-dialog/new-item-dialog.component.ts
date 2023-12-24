import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../service/UserService';


@Component({
  selector: 'app-new-item-dialog',
  templateUrl: './new-item-dialog.component.html',
  styleUrls: ['./new-item-dialog.component.css']
})
export class NewItemDialogComponent {
   newItemName: any;
   formGroup: FormGroup;
   selectedGroup: string = 'admin';
   act="";
   oldData:any;
  constructor(private http:HttpClient,@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<NewItemDialogComponent>,
  private userService:UserService
  ){
    this.formGroup = new FormGroup({
      full_name: new FormControl(data.full_name?data.full_name:'', [Validators.required]),
      email: new FormControl(data.email?data.email:'', [Validators.required])
    })
    this.selectGroup=data.group?data.group:"admin";
    this.act=data.action;
    this.oldData={group:data.group,email:data.email,full_name:data.full_name}
  }
  selectGroup(group: string) {
    this.selectedGroup = group;
  }
saveNewItem(){
    if (this.formGroup.valid) {
      let result={...this.formGroup.value,group:this.selectedGroup}
      console.log('Form submitted:', result);
  
    this.fetchDataAndAddNewUser(result)
  }
}
editAndSaveItem(){
  console.log(this.oldData,"this.oldData")
        let resArr=[this.oldData];
        // this.userService.deletemark(resArr);
        //   this.saveNewItem()

        this.http.get<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/users.json')
        .subscribe((data: any[]) => {
          // const filteredArray = data.filter((item:any) => farr.includes(item));
          const filteredArray = data.filter(secondItem =>
            !(resArr.some((firstItem:any) => firstItem.email === secondItem.email))
          );
          let result={...this.formGroup.value,group:this.selectedGroup}
          filteredArray.push(result)
       
            let updatedData:any={}
            filteredArray.filter(res=>!!res).forEach((user, index) => {
             
              updatedData[index.toString()] = user;
       
            });
       
            this.http.put('https://onlineshoppingapi-default-rtdb.firebaseio.com/users.json', updatedData)
              .subscribe(() => {
                console.log('deletemark ,Data updated successfully');
              }, error => {
                console.error('Error updating data:', error);
              });
          
        });
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
            console.log('fetchDataAndAddNewUser Done');
          }, error => {
            console.error('Error updating data:', error);
          });
      
    });
}

closeBox(){
  this.dialogRef.close()
}
saveAction(){
this.act==="editObj"?this.editAndSaveItem():this.saveNewItem()
}


}
