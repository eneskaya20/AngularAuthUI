import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { BrowserModule } from '@angular/platform-browser';  
import { UserStoreService } from '../../services/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
    addUser() {
      this.router.navigate(['/user-signup']); 
      }
    showUserButton: boolean = true;
    clickMain() {
      throw new Error('Method not implemented.');
    }
    clickDash() {
      this.router.navigate(['/signup']); 
    }
    public users: any = [];  
    public fullName:string = "";
    constructor(private api: ApiService ,private auth: AuthService,private userStore:UserStoreService,private router:Router){}
    public role!:string;
    public department!:string;

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

      this.userStore.getDepartmentFromStore()
      .subscribe(val=>{
        const departFromToken = this.auth.getDepartmentFromToken();
        this.department = val || departFromToken;
      })
   
    }


    logout(){
      this.auth.signOut();
    }

  }
