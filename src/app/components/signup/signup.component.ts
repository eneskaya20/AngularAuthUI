import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit{
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]

    })
  }
  type:string = 'password';
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;
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
    if(this.signupForm.valid){
      //send the data to the server
      console.log(this.signupForm.value);
      this.auth.signUp(this.signupForm.value)
      .subscribe({
        next:(res) =>{
          alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        error:(err)=>{
          alert(err?.error.message);
        } 
      })
    }else{
      ValidateForm.validateAllFormFields(this.signupForm);
      alert('Invalid Form');
    }
  }
}
