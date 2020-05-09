import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  subscibeVideo(videoId){
    return this.http.post(`${environment.apiUrl}/subscribe?video_id=${videoId}`,{});
  }

  getUserSubscriptions(user_id){
    return this.http.get(`${environment.apiUrl}/getSubscriptions?user_id=${user_id}`);
  }
}
