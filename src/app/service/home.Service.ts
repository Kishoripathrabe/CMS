import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import '../../assets/dashboard.json';
import '../../assets/pages.json';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private dataUrl = 'assets/home.json'; 
  constructor(private http: HttpClient) {}

  home(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
}
