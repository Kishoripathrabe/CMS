// filter.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterValueSubject = new BehaviorSubject<string>('');
  private resetFilterSubject = new BehaviorSubject<any>('')

  setFilterValue(filterValue: string) {
    this.filterValueSubject.next(filterValue);
  }
  getFiltervalue(){
    return this.filterValueSubject.asObservable();
  }
  resetFilter(){
    this.resetFilterSubject.next('')
  }
  getresetFilter(){
    return this.resetFilterSubject
  }
}
