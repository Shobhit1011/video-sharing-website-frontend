import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog } from '@angular/material';
import { FileUploadComponent } from 'src/app/file-upload/file-upload.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login-service';
import { LogoutService } from 'src/app/services/logout-service';
import { ToastrService } from 'ngx-toastr';
import { environment} from 'src/environments/environment';
import { SidenavService } from 'src/app/services/sidenav.service';

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

  constructor(public dialog: MatDialog, 
    private router:Router, 
    private loginService: LoginService, 
    private logoutService: LogoutService,
    private toastr: ToastrService,
    private sideNavService: SidenavService) { }

  ngOnInit() {
   this.sideNavService.isExpanded.subscribe((value)=>{
     this.opened = value;
   })
   this.loginService.getSession().subscribe(response=>{
      if(response['session'] && response['session'] === "false"){
        this.loggedIn = false;
        this.loginService.changeStatus(false);
      }
      else{
        this.userInfo = response;
        this.loggedIn = true;
        this.loginService.changeStatus(true);
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
      this.router.navigate(['/']);
      this.toastr.success('Logged out Successfully');
    })
  }

  sideNavChanged(){
    this.opened = !this.opened;
    this.sideNavService.changeStatus(this.opened);
  }
}
