import { Component, OnInit, Input } from '@angular/core';
import { RecommendationService } from './recommendation.service';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  recommendedVideos;
  url:String = environment.apiUrl+"/image?name=";
  @Input() filteredVideo: String;

  constructor(private recommendationService: RecommendationService) { }

  ngOnInit() {
    this.recommendationService.recommend().subscribe((response)=>{
      this.recommendedVideos = response;
      this.recommendedVideos = this.recommendedVideos.filter((video)=> video.name_in_folder != this.filteredVideo);
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
}
