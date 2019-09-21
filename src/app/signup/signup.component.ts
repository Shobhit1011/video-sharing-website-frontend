import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formGroup: FormGroup;
  
  constructor() { }
  
  ngOnInit() {
    this.formGroup = new FormGroup({
      Email: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone_no: new FormControl('', Validators.required)
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
}
