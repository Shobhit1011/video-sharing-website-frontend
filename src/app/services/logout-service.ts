import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from './web-socket-service.service';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {
    constructor(private http: HttpClient, private websocketService: WebSocketService){
    }

    logout(){
        // this.websocketService.setNotificationsCount(0);
        return this.http.get(`${environment.apiUrl}/logout`);
    }
}
