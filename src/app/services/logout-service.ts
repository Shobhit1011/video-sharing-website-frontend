import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {
    constructor(private http: HttpClient){
    }

    logout(){
        return this.http.get(`${environment.apiUrl}/logout`);
    }
}
