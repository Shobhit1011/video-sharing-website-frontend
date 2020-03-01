import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  value: Boolean = false;
  isExpanded: BehaviorSubject<Boolean>;
  
  constructor() { 
    this.isExpanded = new BehaviorSubject(this.value);
  }

  changeStatus(value: Boolean){
    this.isExpanded.next(value);
  }
}
