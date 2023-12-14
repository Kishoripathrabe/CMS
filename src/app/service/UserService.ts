import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import '../../assets/users.json';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = 'assets/users.json'; 
  constructor(private http: HttpClient) {}

  user(): Observable<any> {
    return this.http.get(this.users);
  }
}
