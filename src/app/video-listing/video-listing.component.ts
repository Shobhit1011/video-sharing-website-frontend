import { Component, OnInit, Input } from '@angular/core';
import { VideoListingService } from './video-listing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-listing',
  templateUrl: './video-listing.component.html',
  styleUrls: ['./video-listing.component.css']
})
export class VideoListingComponent implements OnInit {

  @Input() filteredVideo: String;
  videos: any;
  url:String = environment.apiUrl+"/image?name=";
  usernames = [];
  
  constructor(private videoListingService: VideoListingService) { }

  ngOnInit() {
    this.videoListingService.getVideoList().subscribe((response)=>{
      this.videos = response;
      this.videos = this.videos.filter((video)=> video.name_in_folder != this.filteredVideo);
    });
  }

  getFileName(name:String){
    let values = name.split(".");
    return values[0];
  }

  getUrl(name){
    let filename = this.getFileName(name);
    let image_name_format = filename + ".png";
    return this.url + image_name_format;
  }

  getUser(user_id){
    this.videoListingService.getUser(user_id).subscribe((response)=>{
    let name = response['firstName'] + " " + response['lastName'];
    return name;
    })
  }
}
