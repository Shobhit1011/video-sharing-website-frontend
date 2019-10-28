import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoListingComponent } from './video-listing/video-listing.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VideoPlayComponent } from './video-play/video-play.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatListModule, MatCardModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatVideoModule } from 'mat-video';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './components/shared/loader/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/shared/header/header.component';
import { RatingComponent } from './components/shared/rating/rating.component';
import { SignupComponent } from './signup/signup.component';
import { RecommendationComponent } from './recommendation/recommendation.component';


@NgModule({
  declarations: [
    AppComponent,
    VideoListingComponent,
    VideoPlayComponent,
    LoginComponent,
    FileUploadComponent,
    LoaderComponent,
    HomeComponent,
    HeaderComponent,
    RatingComponent,
    SignupComponent,
    RecommendationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatVideoModule,
    ReactiveFormsModule,
    MatCardModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FlexLayoutModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FileUploadComponent
  ]
})
export class AppModule { }
