import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import '../../assets/users.json';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // private users = 'assets/users.json'; 
  private selectedDataSub:any =[]
  private users = 'https://onlineshoppingapi-default-rtdb.firebaseio.com/users.json'; 
  constructor(private http: HttpClient) {}

  user(): Observable<any> {
    return this.http.get(this.users);
  }
  getSelectedData(){
    return (this.selectedDataSub)
  }
  setSelectedData(row:any){
    this.selectedDataSub=row
  }

  deletemark(farr:any){
    this.http.get<any>('https://onlineshoppingapi-default-rtdb.firebaseio.com/users.json')
 .subscribe((data: any[]) => {
   // const filteredArray = data.filter((item:any) => farr.includes(item));
   const filteredArray = data.filter(secondItem =>
     !(farr.some((firstItem:any) => firstItem.email === secondItem.email))
   );

     let updatedData:any={}
     filteredArray.filter(res=>!!res).forEach((user, index) => {
      
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
}
function Of(selectedDataSub: Subject<unknown>) {
  throw new Error('Function not implemented.');
}

