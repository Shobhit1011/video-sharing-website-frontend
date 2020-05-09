import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material';
import { FileUploadComponent } from 'src/app/file-upload/file-upload.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login-service';
import { LogoutService } from 'src/app/services/logout-service';
import { ToastrService } from 'ngx-toastr';
import { environment} from 'src/environments/environment';
import { SidenavService } from 'src/app/services/sidenav.service';
import { WebSocketService } from 'src/app/services/web-socket-service.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: Boolean;
  userInfo: Object;
  @Output() private uploadButtonClicked = new EventEmitter();
  @Output() private dialogClosed = new EventEmitter();

  opened:Boolean = false;
  count:number = 0;
  notificationsCount = 0;
  notifications = [];

  constructor(public dialog: MatDialog, 
    private router:Router, 
    private loginService: LoginService, 
    private logoutService: LogoutService,
    private toastr: ToastrService,
    private sideNavService: SidenavService,
    private websocketService: WebSocketService,
    private headerService: HeaderService) { }

  ngOnInit() {
   const self = this;
   self.sideNavService.isExpanded.subscribe((value)=>{
     self.opened = value;
   })
   self.loginService.getSession().subscribe(response=>{
      if(response['session'] && response['session'] === "false"){
        self.loggedIn = false;
        self.loginService.changeStatus(false);
      }
      else{
        self.userInfo = response;
        self.loggedIn = true;
        self.loginService.changeStatus(true);
        self.headerService.getNotifications().subscribe((data: Array<Object>)=>{
          const unread_notifications = data.map((element) => element['status'] === "unread");
          self.notifications = data;
          const number_of_unread_notifications = unread_notifications.length;
          self.websocketService.setNotificationsCount(number_of_unread_notifications);
        });
        self.websocketService.notificationsCount.subscribe((data)=>{
            self.notificationsCount = data;
        });
        self.websocketService.notifications.subscribe((newNotification)=>{
            self.notifications.unshift(newNotification);
        });
      }
    });
  }

  uploadFile(){
    const dialogRef = this.dialog.open(FileUploadComponent, {
      width: '350px',
      height:'350px',
      autoFocus: false
    });

    this.uploadButtonClicked.emit();

    dialogRef.afterClosed().subscribe(() => {
      this.dialogClosed.emit();
    });
  }

  navigate(){
    this.router.navigate(['auth/login']);
  }

  logout(){
    this.logoutService.logout().subscribe(()=>{
      window.location.href = environment.baseUrl;
      this.toastr.success('Logged out Successfully');
    })
  }

  sideNavChanged(){
    this.opened = !this.opened;
    this.sideNavService.changeStatus(this.opened);
  }
}
