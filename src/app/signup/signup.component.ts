import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../validators/confirmPassword.validator';
import { environment } from 'src/environments/environment';
import { SignupService } from './signup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private sigupService: SignupService,
    private toastr: ToastrService,
    private router: Router) { }
  
  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      Email: new FormControl('', [Validators.required, Validators.pattern(environment.emailRegex)]),
      Password: new FormControl('', Validators.required),
      firstName: new FormControl('', [Validators.required, Validators.pattern(environment.nameRegex)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(environment.nameRegex)]),
      phone_no: new FormControl('', Validators.required),
      confirm_password: new FormControl('',Validators.required)
    },{
      validator: MustMatch('Password','confirm_password')
    });
  }
  
  get EmailInput(){
    return this.formGroup.controls['Email'];
  }

  get PasswordInput(){
    return this.formGroup.controls['Password'];
  }

  get FirstNameInput(){
    return this.formGroup.controls['firstName'];
  }

  get LastNameInput(){
    return this.formGroup.controls['lastName'];
  }

  get PhoneNoInput(){
    return this.formGroup.controls['phone_no'];
  }

  get confirmPasswordInput(){
    return this.formGroup.controls['confirm_password'];
  }

  submit(){
    this.sigupService.signup(this.formGroup.value).subscribe(()=>{
      this.toastr.success("User Registered Successfully");
      this.router.navigateByUrl("/auth/login");
    },(error)=>{
      if(error.error.statusCode === 'DUPLICATE_EMAIL'){
        this.toastr.error("Email already registered with us");
      }
      else{
        this.toastr.error("Something went wrong");
      }
    })
  }
}
