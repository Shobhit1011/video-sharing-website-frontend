import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  constructor(private sideNavService: SidenavService) { }
  isExpanded: Boolean = true;

  ngOnInit() {
   this.sideNavService.isExpanded.subscribe((value)=>{
     this.isExpanded = value;
   })
  }

  navClosed(){
    this.sideNavService.changeStatus(false);
  }
  sideNavChanged(){
    this.isExpanded = !this.isExpanded;
    this.sideNavService.changeStatus(this.isExpanded);
  }
}
