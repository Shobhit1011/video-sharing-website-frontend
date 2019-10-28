import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadService } from './file-upload.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  form : FormGroup
  file: File;
  
  constructor(public dialogRef: MatDialogRef<FileUploadComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data, private fileUploadService: FileUploadService, private toastr: ToastrService) { }

  ngOnInit() {
    this.form = new FormGroup({
      file: new FormControl('', Validators.required),
      filename: new FormControl('', Validators.required),
      description: new FormControl('',Validators.required)
    });
  }

  get FileInput(){
    return this.form.controls['file'];
  }

  get FileNameInput(){
    return this.form.controls['filename'];
  }

  get descriptionInput(){
    return this.form.controls['description'];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  uploadFile(FileInput){
    this.file = FileInput[0];
  }

  submitForm(){
    this.fileUploadService.submitForm(this.file, this.form.value.filename, this.form.value.description).subscribe((response)=>{
      this.toastr.success("File Uploaded successfully");
      this.dialogRef.close();
    },(error)=>{
      this.toastr.error(error.error.message);
    });
  }
}
