import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from '../app.component';
import { BehaviorSubject } from 'rxjs';
import { SubscriptionService } from '../subscription/subscription.service';
import { LoginService } from '../login/login-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
    webSocketEndPoint: string = `http://${environment.backendIP}:8080/com.dell.flat.hyd/socket`;
    topic: string = "/topic/chat";
    stompClient: any;
    appComponent: AppComponent;
    newComment: BehaviorSubject<Object> = new BehaviorSubject({});
    notifications: BehaviorSubject<Object> = new BehaviorSubject({});
    notificationsCount: BehaviorSubject<number> = new BehaviorSubject(0);
    subscriptionCreated: Boolean = false;
    count:number = 0;

    constructor(private subscriptionService: SubscriptionService, private loginService: LoginService){
    }

    setNotificationsCount(value){
        this.count = value;
        this.notificationsCount.next(value);
    };

    _connect() {
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function (frame) {
          _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
              _this.onMessageReceived(sdkEvent);
          });
          _this.stompClient.reconnect_delay = 2000;
          _this.loginService.isLoggedIn.subscribe((isLoggedIn)=>{
              if(isLoggedIn && isLoggedIn === true){
                    _this.getSubscriptions();
              }
          });
      }, this.errorCallBack);
    };

    _disconnect() {
      if (this.stompClient !== null) {
          this.stompClient.disconnect();
      }
    }

    errorCallBack(error) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

    _send(message, videoId, userId) {
        this.stompClient.send(`/app/send/message/${videoId}/${userId}`, {}, message);
    }

    onMessageReceived(message) {
        this.newComment.next(JSON.parse(message.body));
    }

    getSubscriptions(){
        const _this = this;
        const userId = localStorage.getItem('user_id');
        if(userId && !this.subscriptionCreated){
            this.subscriptionService.getUserSubscriptions(userId).subscribe((subscriptions)=>{
                let topics = subscriptions;
                _this.buildWebSocketSubscriptions(topics);
            });
        }
    }

    buildWebSocketSubscriptions(topics){
        const _this = this;
        this.subscriptionCreated = true;
        topics.map((topic)=>{
            _this.stompClient.subscribe(`/topic/${topic}`, function(sdkEvent){
                _this.notifications.next(JSON.parse(sdkEvent.body));
                _this.setNotificationsCount(_this.count + 1);
            });
        })
    }
}
