// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import '../../assets/footer.json';

@Injectable({
  providedIn: 'root',
})
export class footerService {
  private dataUrl = 'assets/footer.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  footerData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
}
