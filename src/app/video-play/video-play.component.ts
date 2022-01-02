import { Component, OnInit, ElementRef, HostListener} from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { RatingService } from './rating.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login-service';
import * as shaka from 'shaka-player'
import { PlaybackOptionsComponent } from '../playback-options/playback-options.component';
import { Title } from '@angular/platform-browser';
import { WebSocketService } from '../services/web-socket-service.service';
import { SubscriptionService } from '../subscription/subscription.service';

@Component({
  selector: 'app-video-play',
  templateUrl: './video-play.component.html',
  styleUrls: ['./video-play.component.css']
})
export class VideoPlayComponent implements OnInit {

  videoName: String;
  url;
  loggedIn: Boolean;
  userInfo: Object;
  uploader: String;
  videoId: String;
  ratingValue: Number;
  showRatingsDiv: Boolean = false;
  manifestUri: String;
  shaka_player;
  quality = "full";
  playBacKRate = "1.0";
  list;
  currentVideo;
  user;
  comments;
  message;
  subscriptions;
  video_script_path = '../../assets/scripts/video-player.js';

  constructor(private route: ActivatedRoute,
    private elRef: ElementRef, public dialog: MatDialog, private http: HttpClient, private router: Router, 
    private ratingService: RatingService, private loginService: LoginService, private toastr: ToastrService, 
    private titleService: Title, private websocketAPI: WebSocketService, private subscriptionService: SubscriptionService) {
  
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.widthCalculation();
  }

  widthCalculation() {
    if (window.innerWidth <= 1024) {
      document.getElementById('videoWidth').style.width = "100%";
      document.getElementById('container-display').style.display = "block";
      document.getElementById('listing').style.marginLeft = "0px";
      document.getElementById('listing').style.marginTop = "0%";
      document.getElementById('listing').style.width = "100%";
      document.getElementById('container-display').style.marginLeft = '2%';
      document.getElementById('container-display').style.marginRight = '1%';
      document.getElementById('quality').style.display = "none";
      document.getElementById('speed').style.display = "none";
      document.getElementById('listing').style.marginTop = "20px"

    }
    else {
      document.getElementById('videoWidth').style.width = "70%";
      document.getElementById('container-display').style.display = "flex";
      document.getElementById('listing').style.marginLeft = "25px";
      document.getElementById('listing').style.marginTop = "-0.5%";
      document.getElementById('listing').style.width = "25%";
      document.getElementById('container-display').style.marginLeft = '5%';
      document.getElementById('container-display').style.marginRight = '0%';
      document.getElementById('quality').style.display = "block";
      document.getElementById('speed').style.display = "block";
      document.getElementById('listing').style.marginTop = "0px"
    }
  }

  loadVideoScript() {
    const externalScriptArray = [
      this.video_script_path
    ];
    for (let i = 0; i < externalScriptArray.length; i++) {
      const scriptTag = document.createElement('script');
      scriptTag.src = externalScriptArray[i];
      scriptTag.type = 'text/javascript';
      scriptTag.async = false;
      scriptTag.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(scriptTag);
    }
  }

  settingVariablesAndCss(response, routeParams){
    this.titleService.setTitle(response['video']['videoName'].toUpperCase());
    this.currentVideo = response['video'];
    this.videoName = response['video']['name_in_folder'];
    this.uploader = response['uploaded_by'];
    this.url = `${environment.apiUrl}/videoStreaming?filename=${this.videoName}`;
    this.videoId = routeParams.id;
    this.manifestUri = response['video']['manifest_path'];
    this.manifestUri = this.manifestUri.replace("localhost", environment.backendIP);
  }

  ngOnInit() {
    console.log("Insidr ittititti")
    this.widthCalculation();
    this.loadVideoScript();
    document.getElementById('cover-spin').style.display = "none";
    this.loginService.isLoggedIn.subscribe(() => { });

    // Setting Variables based on route params.
    this.route.params.subscribe(routeParams => {
      this.http.get(`${environment.apiUrl}/videoById?id=${routeParams.id}`).subscribe((response) => {
        this.settingVariablesAndCss(response, routeParams);

        // Checking User session for rating.
        this.loginService.isLoggedIn.subscribe((isLoggedIn) => {
          if (isLoggedIn && isLoggedIn === true) {
            this.http.get(`${environment.apiUrl}/user/session`).subscribe((user) => {
              this.user = user;
              this.loggedIn = true;
              this.showRatingsDiv = true;
              this.ratingService.getVideoRatingByUser(this.videoId).subscribe((response) => {
                if (response['message'] && response['message'] === "NOT_RATED_YET") {
                  this.ratingValue = 0;
                }
                else {
                  this.ratingValue = response['ratings'];
                }
              }, () => {
                this.toastr.error("Something went wrong");
              });

          // Setting Comments Array.
              this.http.get(`${environment.apiUrl}/comments/${routeParams.id}`).subscribe((comments) => {
                this.comments = comments;
                this.websocketAPI.newComment.subscribe((comment) => {
                  if (comment['videoId'] === parseInt(routeParams.id)) {
                    this.comments.push(comment);
                    let set = new Set(this.comments);
                    this.comments = [...set];
                  }
                });
              });
          
            // Getting User Subscriptions.
              this.subscriptionService.getUserSubscriptions(user['id']).subscribe((data) => {
                this.subscriptions = data;
              });
            });
          }
          else {
            this.showRatingsDiv = false;
          }
        });

        // Logic for checking video buffering.
        var lastPlayPos = 0;
        var currentPlayPos = 0;
        var bufferingDetected = false;

        const player = this.elRef.nativeElement.querySelector('video');
        this.shaka_player = new shaka.Player(player);
        this.buffering(lastPlayPos, currentPlayPos, bufferingDetected, player, 150.0);

        this.shaka_player.addEventListener('error', this.onErrorEvent);

        // Try to load a manifest.
        // This is an asynchronous process.
        document.getElementById('cover-spin').style.display = "display";
        this.shaka_player.load(this.manifestUri + '?quality=full').then(() => {
          player.play();
        }).catch(this.onError);
      })
    });
  }

  //Checking whether user has subscription for particualr video or not.
  checkSubscription(name) {
    return this.subscriptions.includes(name);
  }

  private buffering(lastPlayPos, currentPlayPos, bufferingDetected, player, checkInterval) {
    setInterval(checkBuffering, checkInterval)
    function checkBuffering() {
      if (player) {
        currentPlayPos = player.currentTime
        // checking offset should be at most the check interval
        // but allow for some margin
        var offset = (checkInterval - (checkInterval / 2)) / 1000

        // if no buffering is currently detected,
        // and the position does not seem to increase
        // and the player isn't manually paused...
        if (
          !bufferingDetected
          && currentPlayPos < (lastPlayPos + offset)
          && !player.paused
        ) {
          document.getElementById('cover-spin').style.display = "block";
          player.classList.add('blurring-effect');
          bufferingDetected = true
        }

        // if we were buffering but the player has advanced,
        // then there is no buffering
        if (
          bufferingDetected
          && currentPlayPos > (lastPlayPos + offset)
          && !player.paused
        ) {
          document.getElementById('cover-spin').style.display = "none";
          player.classList.remove('blurring-effect');
          bufferingDetected = false
        }
        lastPlayPos = currentPlayPos
      }
    }
  }

  private onErrorEvent(event) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  private onError(error) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }

  play() {
    const player = this.elRef.nativeElement.querySelector('video');
    player.play();
  }

  stop() {
    const player = this.elRef.nativeElement.querySelector('video');
    player.pause();
  }

  rating(event) {
    this.ratingService.ratings(this.videoId, event.rating).subscribe((response) => {
      this.toastr.success("Rated Successfully");
    }, (error) => {
      if (error.error.code === 400) {
        this.toastr.error(error.error.message);
      } else {
        this.toastr.error("Something went wrong");
      }
    })
  }

  changePlayBackSpeed(event) {
    const playBackSpeed = event.target.value;
    const player = this.elRef.nativeElement.querySelector('video');
    player.playbackRate = playBackSpeed;
    this.playBacKRate = playBackSpeed;
  }

  changeQuality(event) {
    this.quality = event.target.value;
    const player = this.elRef.nativeElement.querySelector('video');

    const videoCurrentTime = player.currentTime;
    this.shaka_player.load(this.manifestUri + `?quality=${this.quality}`).then(() => {
      player.playbackRate = this.playBacKRate;
      player.currentTime = videoCurrentTime;
      player.play();
    }).catch(this.onError);
  }

  openPlayBackOptionsOnOnMobile() {
    this.stop();
    const player = this.elRef.nativeElement.querySelector('video');

    const dialogRef = this.dialog.open(PlaybackOptionsComponent, {
      width: '350px',
      height: '350px',
      autoFocus: false,
      data: {
        quality: this.quality,
        playBackSpeed: this.playBacKRate,
        video: this.elRef.nativeElement.querySelector('video')
      }
    });

    dialogRef.componentInstance.onAdd.subscribe((data) => {
      this.playBacKRate = data.speed;
      this.quality = data.quality;
      document.getElementById('quality_select')['value'] = this.quality;
      document.getElementById('speed_select')['value'] = this.playBacKRate;

      const videoCurrentTime = player.currentTime;
      this.shaka_player.load(this.manifestUri + `?quality=${data.quality}`).then(() => {
        player.currentTime = videoCurrentTime;
        player.playbackRate = data.speed;
        player.play();
        dialogRef.close()
      }).catch(this.onError);
    });
  }

  showDropDown() {
    document.getElementById('dropdown-options').style.display = "block";
  }

  send() {
    try{
      this.websocketAPI._send(this.message, this.videoId, this.user.id);
      this.message = "";
    } catch(error){
      console.log(error);
    }
  }
}