import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login-service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router) { }
  
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.loginService.getSession().subscribe((response)=>{
      if(response['session']){
        if(response['session'] === "false"){
          
        }
      }
      else{
        this.router.navigate(['/']);
      }
    });
  }

  get usernameInput(){
    return this.form.controls['username'];
  }

  get passwordInput(){
    return this.form.controls['password'];
  }

  login(){
    this.loginService.login(this.form.value.username, this.form.value.password).subscribe((response)=>{
      this.toastr.success('Logged in Successfully');
      this.router.navigate(['/']);
    },(error)=>{
      if(error.error.statusCode === 'INVALID_CREDENTIALS'){
        this.toastr.error("Either wrong username or password");
      }
      else if(error.error.statusCode === 'USER_NOT_FOUND'){
        this.toastr.error("User not registered with us");
      }
    })
  }
}
