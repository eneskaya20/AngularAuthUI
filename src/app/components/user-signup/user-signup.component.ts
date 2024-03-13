import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrl: './user-signup.component.scss'
})
export class UserSignupComponent implements OnInit {
  ngOnInit(): void {
    this.userSignupForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      role: ['',Validators.required],
      department: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]

    })
  }

  type:string = 'password';
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash";
  userSignupForm!: FormGroup;
  constructor (private fb:FormBuilder, private auth:AuthService,private router:Router) {}

  hideShowPass(){
    this.isText = !this.isText;
    if(this.isText){
      this.type = 'text';
      this.eyeIcon = "fa-eye";
    }else{
      this.type = 'password';
      this.eyeIcon = "fa-eye-slash";
    }
  }

  onSignup(){
    if(this.userSignupForm.valid){
      
      console.log(this.userSignupForm.value);
      this.auth.Register(this.userSignupForm.value)
      .subscribe({
        next:(res) =>{
          alert(res.message);
          this.userSignupForm.reset();
          this.router.navigate(['/login']);
        },
        error:(err)=>{
          alert(err?.error.message);
        } 
      })
    }else{
      ValidateForm.validateAllFormFields(this.userSignupForm);
      alert('Invalid Form');
    }
  }
}
