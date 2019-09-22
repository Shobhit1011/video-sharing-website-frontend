import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch } from '../validators/confirmPassword.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }
  
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
}
