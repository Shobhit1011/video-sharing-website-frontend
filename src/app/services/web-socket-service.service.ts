import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from '../app.component';
import { BehaviorSubject } from 'rxjs';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
    webSocketEndPoint: string = 'http://192.168.1.6:8080/com.dell.flat.hyd/socket';
    topic: string = "/chat";
    stompClient: any;
    appComponent: AppComponent;
    newComment: BehaviorSubject<Object> = new BehaviorSubject({});
    notifications: BehaviorSubject<Object> = new BehaviorSubject({});

    constructor(private subscriptionService: SubscriptionService){
    }

    _connect() {
      let ws = new SockJS(this.webSocketEndPoint);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function (frame) {
          _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
              _this.onMessageReceived(sdkEvent);
          });
          _this.stompClient.reconnect_delay = 2000;
          _this.getSubscriptions();
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
        if(userId){
            this.subscriptionService.getUserSubscriptions(userId).subscribe((subscriptions)=>{
                let topics = subscriptions;
                _this.buildWebSocketSubscriptions(topics);
            });
        }
    }

    buildWebSocketSubscriptions(topics){
        const _this = this;
        console.log(topics)
        topics.map((topic)=>{
            _this.stompClient.subscribe(`/${topic}`, function(sdkEvent){
                _this.notifications.next(JSON.parse(sdkEvent.body));
            });
        })
    }
}
