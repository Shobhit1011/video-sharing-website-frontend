import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SubscriptionService } from '../subscription.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.css']
})
export class ConfirmationBoxComponent implements OnInit {

  @Output() subscriptionDone= new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  public dialogRef: MatDialogRef<ConfirmationBoxComponent>,
  private subscriptionService: SubscriptionService,
  private toastr: ToastrService) { }

  ngOnInit() {
  }

  onNoClick(){
    this.dialogRef.close();
  }

  subscribe(){
    this.subscriptionService.subscibeVideo(this.data.videoId).subscribe((response)=>{
      this.toastr.success("Subscribed Successfully");
      this.subscriptionDone.emit();
      this.dialogRef.close();
    });
  }
}
