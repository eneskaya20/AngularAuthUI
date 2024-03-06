import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})



export class LoginComponent implements OnInit {
  type:string = 'password';
  isText:boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor (private fb: FormBuilder, private auth: AuthService, private router: Router,private userStore:UserStoreService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

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
  onLogin(){
    if(this.loginForm.valid){
      //send the data to the server
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next:(res) =>{
          alert(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.router.navigate(['/dashboard']);
        },
        error:(err)=>{
          alert(err?.error.message);
        } 
      })
    }else{
      ValidateForm.validateAllFormFields(this.loginForm);
      alert('Invalid Form');
    }
  }


}
