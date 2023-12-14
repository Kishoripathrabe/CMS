import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import '../../assets/dashboard.json';
import '../../assets/pages.json';

@Injectable({
  providedIn: 'root',
})
export class dashboardService {
  private dataUrl = 'assets/dashboard.json'; 
  private page = 'assets/pages.json';
  private pageData:any
  constructor(private http: HttpClient) {}

  dashboardData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
  getpages() {
    return this.http.get(this.page);
  }
}
