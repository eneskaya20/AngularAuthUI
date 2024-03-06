import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl:string = "https://localhost:7148/api/User/";
  constructor(private hhtp:HttpClient) { }

  getUsers(){
    return this.hhtp.get<any>(this.baseUrl);
  }
}
