import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { RatingService } from './rating.service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login/login-service';

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
      document.getElementById('listing').style.marginTop = "15%";
    }
    else {
      document.getElementById('videoWidth').style.width = "70%";
      document.getElementById('container-display').style.display = "flex";
      document.getElementById('listing').style.marginLeft = "25px";
      document.getElementById('listing').style.marginTop = "1.5%";
      document.getElementById('videoWidth').style.marginTop = "2%";
    }
  }

  ngOnInit() {
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
