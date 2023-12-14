// filter.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterValueSubject = new BehaviorSubject<string>('');


  setFilterValue(filterValue: string) {
    this.filterValueSubject.next(filterValue);
  }
  getFiltervalue(){
    return this.filterValueSubject.asObservable();
  }
}
