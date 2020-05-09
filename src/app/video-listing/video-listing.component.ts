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
  i=1;
  showLoadMore = false;
  isFirstTime = false;
  pageSize = 7;
  showLoaderImage = false;
  
  constructor(private videoListingService: VideoListingService) { }

  ngOnInit() {
    const skip = 0;
    const limit = this.pageSize;
    let count = 0;

    this.videoListingService.getVideoList(skip, limit).subscribe((response)=>{
      this.videoListingService.getVideosCount().subscribe((countFromApi)=>{
      count = Number(countFromApi);
      if(response['length'] < count){
        this.showLoadMore = true;
      }
      else{
        this.showLoadMore = false;
      }
      this.videos = response;
      this.videos = this.videos.filter((video)=> video.status === "Done");
      this.videos = this.videos.filter((video)=> video.name_in_folder != this.filteredVideo);
      })
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

  loadMore(i){
    const skip = i * this.pageSize;
    const limit = this.pageSize;
    let count = 0;
    this.showLoaderImage = true;

    this.videoListingService.getVideoList(skip, limit).subscribe((response)=>{
      this.videoListingService.getVideosCount().subscribe((countFromApi)=>{
        const newVideos = response;
        this.showLoaderImage = false;
        count = Number(countFromApi);

        if(this.videos.concat(newVideos).length < count - 1){
          this.showLoadMore = true;
          this.videos = this.videos.concat(newVideos);
          this.videos = this.videos.filter((video)=> video.name_in_folder != this.filteredVideo);
        }
        else if(this.videos.concat(newVideos).length === count - 1 && !this.isFirstTime){
          this.showLoadMore = false;
          this.videos = this.videos.concat(newVideos);
          this.videos = this.videos.filter((video)=> video.name_in_folder != this.filteredVideo);
        }
        else if(this.videos.concat(newVideos).length === count){
          let videoNames = this.videos.map(video => video.name_in_folder);
          if(!videoNames.includes(this.filteredVideo)){
            this.showLoadMore = false;
            this.videos = this.videos.concat(newVideos);
            this.videos = this.videos.filter((video)=> video.name_in_folder != this.filteredVideo);
          }
        }
        else{
          this.showLoadMore = false;
        }
      })
    });

    this.i++;
  }
}
