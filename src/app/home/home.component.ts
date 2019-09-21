import { Component, OnInit, HostListener } from '@angular/core';
import { LoginService } from '../login/login-service';
import { HomeService } from './home.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedIn: Boolean;
  userInfo: Object;
  videos;
  url = environment.apiUrl+'/image?name=';
  innerWidth = window.innerWidth;

  constructor(private loginService: LoginService, private homeService: HomeService) { }

  ngOnInit() {
    this.loginService.getSession().subscribe(response=>{
      if(response['session'] && response['session'] === "false"){
        this.loggedIn = false;
      }
      else{
        this.userInfo = response;
        this.loggedIn = true;
      }
      this.homeService.getVideoList().subscribe((response)=>{
        this.videos = response;
      })
    });
  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
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
