import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class VideoListingService {

  constructor(private http: HttpClient) { }

  getVideoList(){
    return this.http.get(`${environment.apiUrl}/getAllVideos`);
  }

  getUser(id){
    return this.http.get(`${environment.apiUrl}/users/${id}`);
  }
}
