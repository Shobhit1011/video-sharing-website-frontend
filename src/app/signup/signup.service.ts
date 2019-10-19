import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(formValue){
    if(formValue.Email)
      formValue.email = formValue.Email;
    if(formValue.Password)
      formValue.password = formValue.Password;

    delete formValue.confirm_password;
    delete formValue.Email;
    delete formValue.Password;

    return this.http.post(`${environment.apiUrl}/register`, formValue);
  }
}
