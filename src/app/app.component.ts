import { Component } from '@angular/core';
import { WebSocketService } from './services/web-socket-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private websocketAPI: WebSocketService){

  }

  ngOnInit(){
    this.websocketAPI._connect();
  }
}
