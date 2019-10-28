import { Component, OnInit, ElementRef, HostListener, Renderer2, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { RatingService } from './rating.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login-service';
import { DOCUMENT } from '@angular/common';

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

  constructor(private route: ActivatedRoute,
    private elRef: ElementRef,
    public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private ratingService: RatingService,
    private loginService: LoginService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private toastr: ToastrService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
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
    }
    else {
      document.getElementById('videoWidth').style.width = "65%";
      document.getElementById('container-display').style.display = "flex";
      document.getElementById('listing').style.marginLeft = "25px";
      document.getElementById('listing').style.marginTop = "-0.5%";
    }
  }

  ngOnInit() {
    let script = this._renderer2.createElement('script');
    script.type = "application/javascript";
    script.text = ` var btnBackward = document.querySelector('.btn-backward');
    var btnExpand = document.querySelector('.btn-expand');
    var videoContainer = document.querySelector('.video-container-1');
    var videoControls = document.querySelector('.video-controls');
    var btnMute = document.querySelector('.btn-mute');
    var btnMuteIcon = btnMute.querySelector('.fa');
    var btnPlay = document.querySelector('.btn-pause');
    var btnPlayIcon = btnPlay.querySelector('.fa');
    var btnForward = document.querySelector('.btn-forward');
    var btnReset = document.querySelector('.btn-reset');
    var btnStop = document.querySelector('.btn-stop');
    var progressBarFill = document.getElementById('progress-bar-fill');
    var videoElement = document.querySelector('.video-container');
    var bufferedBar = document.getElementById("buffered-amount");
    var defaultBar = document.getElementById("default-bar");
    var videoNameContainer = document.querySelector(".video-name-container");
    var timeBar = document.getElementById("time-bar");

    window.onload = function () {
      videoElement.addEventListener('timeupdate', updateProgress, false);
  }

    // Toggle full-screen mode
    var expandVideo = () => {
      if (videoElement.requestFullscreen) {
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoContainer.requestFullscreen();
      
      } else if (videoElement.mozRequestFullScreen) {
        // Version for Firefox
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoContainer.mozRequestFullScreen();
      } else if (videoElement.webkitRequestFullscreen) {
        // Version for Chrome and Safari
        videoElement.style.width = "100%";
        videoElement.style.height = "100%";
        videoContainer.webkitRequestFullscreen();
      }
    }

    // Move the video backward for 5 seconds
    var moveBackward = () => {
      videoElement.currentTime -= 5;
    }

    // Move the video forward for 5 seconds
    var moveForward = () => {
      videoElement.currentTime += 5;
    }

    // Mute the video
    var muteVideo = () => {
      if (videoElement.muted) {
        videoElement.muted = false;

        btnMuteIcon.classList.remove('fa-volume-up');
        btnMuteIcon.classList.add('fa-volume-off');
      } else {
        videoElement.muted = true;
        btnMuteIcon.classList.remove('fa-volume-off');
        btnMuteIcon.classList.add('fa-volume-up');
      }
    }

    // Play / Pause the video
    var playPauseVideo = () => {
      if (videoElement.paused) {
        videoElement.play();

        btnPlayIcon.classList.remove('fa-play');
        btnPlayIcon.classList.add('fa-pause');
      } else {
        videoElement.pause();

        btnPlayIcon.classList.remove('fa-pause');
        btnPlayIcon.classList.add('fa-play');
      }
    }

    // Restart the video
    var restartVideo = () => {
      videoElement.currentTime = 0;

      btnPlay.removeAttribute('hidden');
      btnReset.setAttribute('hidden', 'true');
      videoElement.play();
      btnPlayIcon.classList.add('fa-pause');
    }

    // Stop the video
    var stopVideo = () => {
      videoElement.pause();
      videoElement.currentTime = 0;
      btnPlayIcon.classList.remove('fa-pause');
      btnPlayIcon.classList.add('fa-play');
    }

    // Update progress bar as the video plays
    var updateProgress = () => {
        let currentWidth = (100/videoElement.duration) * videoElement.currentTime;
        progressBarFill.style.width = currentWidth + "%";
        if(videoElement.duration){
          if(videoElement.duration/3600 >= 1){
            let totalTimeInHours = Math.floor(videoElement.duration/3600);
            let totalModTimeInHours = totalTimeInHours > 9 ? totalTimeInHours : '0'+totalTimeInHours;
            let totalTime = totalTimeInHours % 3600;
            let totalTimeInMinutes = Math.floor(totalTime/60);
            let totalModTimeInMinutes = totalTimeInMinutes > 9 ? totalTimeInMinutes : '0'+totalTimeInMinutes;
            let totalTime2 = totalTimeInMinutes % 60;
            let totalTimeInSeconds = totalTime2;
            let totalModTimeInSeconds = totalTimeInSeconds > 9 ? totalTimeInSeconds : '0'+totalTimeInSeconds;
            let totalDuration = totalModTimeInHours + ":" + totalModTimeInMinutes + ":" +totalModTimeInSeconds;
  
            let timeInHours = Math.floor(videoElement.currentTime/3600);
            let modTimeInHours = timeInHours > 9 ? timeInHours : '0'+timeInHours;
            let time = timeInHours % 3600;
            let timeInMinutes = Math.floor(time/60);
            let modTimeInMinutes = timeInMinutes > 9 ? timeInMinutes : '0'+timeInMinutes;
            let time2 = timeInMinutes % 60;
            let timeInSeconds = time2;
            let modTimeInSeconds = timeInSeconds > 9 ? timeInSeconds : '0'+timeInSeconds;
            let timeElapsed = modTimeInHours + ":" + modTimeInMinutes + ":" +modTimeInSeconds;
            
            timeBar.innerHTML = timeElapsed + "/" + totalDuration;
          }
          else if(videoElement.duration/60 >= 1){
            let totalTimeInMinutes = Math.floor(videoElement.duration/60);
            let totalModTimeInMinutes = totalTimeInMinutes > 9 ? totalTimeInMinutes : '0'+totalTimeInMinutes;
            let totalTimeInSeconds = Math.floor(videoElement.duration%60);
            let totalModTimeInSeconds = totalTimeInSeconds > 9 ? totalTimeInSeconds : '0'+totalTimeInSeconds;
            let totalDuration = totalModTimeInMinutes + ":" +totalModTimeInSeconds;
  
            let timeInMinutes = Math.floor(videoElement.currentTime/60);
            let modTimeInMinutes = timeInMinutes > 9 ? timeInMinutes : '0'+timeInMinutes;
            let timeInSeconds = Math.floor(videoElement.currentTime%60);
            let modTimeInSeconds = timeInSeconds > 9 ? timeInSeconds : '0'+timeInSeconds;
            let timeElapsed = modTimeInMinutes + ":" +modTimeInSeconds;
  
            timeBar.innerHTML = timeElapsed + "/" + totalDuration;
  
          }
          else{
            let totalTimeInSeconds = Math.floor(videoElement.duration%60);
            let totalModTimeInSeconds = totalTimeInSeconds > 9 ? totalTimeInSeconds : '0'+totalTimeInSeconds;
            let totalDuration = "00" + ":" +totalModTimeInSeconds;
  
            let timeInSeconds = Math.floor(videoElement.currentTime%60);
            let modTimeInSeconds = timeInSeconds > 9 ? timeInSeconds : '0'+timeInSeconds;
            let timeElapsed = "00" + ":" +modTimeInSeconds;
  
            timeBar.innerHTML = timeElapsed + "/" + totalDuration;
          }
      }
    }

    function seek(e) {
      var percent = e.offsetX/defaultBar.offsetWidth;
      videoElement.currentTime = percent * videoElement.duration;
      e.target.value = Math.floor(percent / 100);
    }

    function changeHeight(){
      progressBarFill.style.height = "8px";
      defaultBar.style.height = "8px";
      bufferedBar.style.height = "8px";
    }

    function defaultHeight(){
      progressBarFill.style.height = "4px";
      defaultBar.style.height = "4px";
      bufferedBar.style.height = "4px";
    }

    var timeout;

    function disableControls(){
      videoControls.style.display = "block";
      clearTimeout(timeout);
      timeout = setTimeout(()=>{
        if(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen){
          videoControls.style.display = "none"
        }
      },3000);
    }

    function inactivityTimer(){
      if(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen){
        setTimeout(()=>{
          videoControls.style.display = "none"
        },3000);
        videoContainer.addEventListener('mousemove', disableControls);
        videoNameContainer.style.display = "none";
      }
      else{
        videoNameContainer.style.display = "block";
        enableControls();
      }
    }

    function enableControls(){
      videoControls.style.display = "block";
      videoContainer.removeEventListener('mousemove', disableControls)
    }


    // Event listeners
    btnBackward.addEventListener('click', moveBackward, false);
    btnExpand.addEventListener('click', expandVideo, false);
    btnMute.addEventListener('click', muteVideo, false);
    btnPlay.addEventListener('click', playPauseVideo, false);
    btnForward.addEventListener('click', moveForward, false);
    btnReset.addEventListener('click', restartVideo, false);
    btnStop.addEventListener('click', stopVideo, false);
    bufferedBar.addEventListener('click',seek);
    progressBarFill.addEventListener('click',seek);
    defaultBar.addEventListener('click',seek);

    progressBarFill.addEventListener('mouseover',changeHeight);
    progressBarFill.addEventListener('mouseleave', defaultHeight);

    bufferedBar.addEventListener('mouseover',changeHeight);
    bufferedBar.addEventListener('mouseleave', defaultHeight);

    defaultBar.addEventListener('mouseover',changeHeight);
    defaultBar.addEventListener('mouseleave', defaultHeight);

    document.addEventListener("fullscreenchange",inactivityTimer);

    /* Firefox */
    document.addEventListener("mozfullscreenchange",inactivityTimer);

    /* Chrome, Safari and Opera */
    document.addEventListener("webkitfullscreenchange",inactivityTimer);

    /* IE / Edge */
    document.addEventListener("msfullscreenchange",inactivityTimer);


    videoElement.addEventListener('ended', () => {
      btnPlayIcon.classList.remove('fa-pause');
      btnPlayIcon.classList.add('fa-play');
      btnReset.removeAttribute('hidden');
    }, false);

    videoElement.addEventListener('timeupdate', updateProgress, false);

    videoElement.addEventListener('progress', function() {
      var duration =  videoElement.duration;
      if (duration > 0) {
        for (var i = 0; i < videoElement.buffered.length; i++) {
              if (videoElement.buffered.start(videoElement.buffered.length - 1 - i) < videoElement.currentTime) {
                  document.getElementById("buffered-amount").style.width = (videoElement.buffered.end(videoElement.buffered.length - 1 - i) / duration) * 100 + "%";
                  // console.log(document.getElementById("buffered-amount").style.width)
                  break;
              }
          }
      }
    });
    `
    this._renderer2.appendChild(this._document.body, script);

    this.loginService.isLoggedIn.subscribe((value) => {
      console.log(value);
    })
    this.route.params.subscribe(routeParams => {
      this.http.get(`${environment.apiUrl}/videoById?id=${routeParams.id}`).subscribe((response) => {
        this.widthCalculation();
        this.videoName = response['video']['name_in_folder'];
        this.uploader = response['uploaded_by'];
        this.url = `${environment.apiUrl}/videoStreaming?filename=${this.videoName}`;
        this.videoId = routeParams.id;

        this.loginService.isLoggedIn.subscribe((isLoggedIn) => {
          if (isLoggedIn && isLoggedIn === true) {
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
            })
          }
          else {
            this.showRatingsDiv = false;
          }
        })

        const player = this.elRef.nativeElement.querySelector('video');
        player.load();
        player.play();
      })
    });
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
      console.log(error)
      if (error.error.code === 400) {
        this.toastr.error(error.error.message);
      } else {
        this.toastr.error("Something went wrong");
      }
    })
  }
}
