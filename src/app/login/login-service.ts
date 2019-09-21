import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  session: Boolean = false;
  isLoggedIn: BehaviorSubject<Boolean>;

  constructor(private http: HttpClient) { 
    this.isLoggedIn = new BehaviorSubject(this.session);
  }
 
  changeStatus(value: Boolean){
    this.isLoggedIn.next(value);
  }

  login(username:String, password:String){
    return this.http.post(`${environment.apiUrl}/login`,{
      email: username,
      password: password
    });
  }

  getSession(){
    return this.http.get(`${environment.apiUrl}/auth`);
  }
}
