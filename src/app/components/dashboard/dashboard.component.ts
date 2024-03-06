import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { BrowserModule } from '@angular/platform-browser';  
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
    public users: any = [];  
    public fullName:string = "";
    constructor(private api: ApiService ,private auth: AuthService,private userStore:UserStoreService){}
    public role!:string;

    ngOnInit(){
      this.api.getUsers().subscribe(res =>{
        this.users = res;

      });
      this.userStore.getFullNameFromStore()
      .subscribe(val =>{
        let fullNameFromToken = this.auth.getFullNameFromToken();
        this.fullName = val || fullNameFromToken;
      });

      this.userStore.getRoleFromStore()
      .subscribe(val=>{
        const roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      })
     
   
    }


    logout(){
      this.auth.signOut();
    }

  }
