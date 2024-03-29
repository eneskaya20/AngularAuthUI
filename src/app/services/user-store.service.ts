import { Injectable } from '@angular/core';
import { getRandomValues } from 'crypto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  private department$ = new BehaviorSubject<string>("");
  constructor() { }

  public getDepartmentFromStore(){
    return this.department$.asObservable();
  }
  public setDepartmentForStore(department:string){
    this.department$.next(department);
  }
  public getRoleFromStore(){
    return this.role$.asObservable();
  }
  public setRoleForStore(role:string){
    this.role$.next(role);
  }
  public getFullNameFromStore(){
    return this.fullName$.asObservable();
  }
  public setFullNameForStore(fullname:string){
    this.fullName$.next(fullname);
  }
}
