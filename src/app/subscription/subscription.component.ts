import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmationBoxComponent } from './confirmation-box/confirmation-box.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  @Input() videoId: number;
  @Input() subscribed: Boolean;
  subscription_text;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if(this.subscribed){
      this.subscription_text = "Subscribed";
    }
    else{
      this.subscription_text = "Subscribe";
    }
  }

  subscribe(){
  const self = this;
    if(!self.subscribed){
      const dialogRef = self.dialog.open(ConfirmationBoxComponent,{
        width: '300px',
        data:{ videoId: self.videoId}
      });
      dialogRef.componentInstance.subscriptionDone.subscribe(()=>{
        self.changeText()
      });
    }
  }

  changeText(){
    this.subscription_text = "Subscribed";
  }
}
