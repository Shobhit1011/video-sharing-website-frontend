import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http:HttpClient) { }

  submitForm(file: File, name: String, description: String){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.apiUrl}/postVideo?name=${name}&description=${description}`,formData);
  }
}
