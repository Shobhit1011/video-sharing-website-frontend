import { Component, OnInit, Inject, Optional, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-playback-options',
  templateUrl: './playback-options.component.html',
  styleUrls: ['./playback-options.component.css']
})
export class PlaybackOptionsComponent implements OnInit {
  form : FormGroup;
  quality;
  playBackSpeed;
  onAdd = new EventEmitter();
  
  constructor(public dialogRef: MatDialogRef<PlaybackOptionsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data) { 
    }

  ngOnInit() {
   this.form = new FormGroup({
      speed: new FormControl(''),
      quality: new FormControl('')
    });

   this.form.get('speed').setValue(this.data.playBackSpeed.toString());
   this.form.get('quality').setValue(this.data.quality);

  }

  get speedInput(){
    return this.form.controls.speed;
  }

  get qualityInput(){
    return this.form.controls.quality;
  }

  submitForm(){
    this.onAdd.emit(this.form.value);
  }
}
