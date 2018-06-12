import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn:'root'})
export class NavService {
    sideNav: any = false;
    sideNavUpdated = new EventEmitter();
    currentNavItem:string = '';

  constructor() { }

  getSideNavState() {
    return this.sideNavUpdated;
  }
  setSideNavState (state) {
    this.sideNav = state;
    this.sideNavUpdated.emit(this.sideNav);
  }
  getCorrentNavItem(){
    return this.currentNavItem;
  }
  setCurrentNavItem(navItem){
    this.currentNavItem = navItem;
  }

}