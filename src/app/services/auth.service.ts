import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {window} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = "https://localhost:7148/api/User/"
  private userPayload:any;
  constructor(private http: HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}signup`, userObj)
  }

  Register(userObj: any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }   

  getFullNameFromToken(){
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
  }
  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }
  getDepartmentFromToken(){
    if(this.userPayload){
      return this.userPayload.department;
    }
  }
}
