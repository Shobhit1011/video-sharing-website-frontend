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
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PlaybackOptionsComponent } from './playback-options/playback-options.component';
import { AvatarModule } from 'ngx-avatar';
import { SideNavComponent } from './components/shared/side-nav/side-nav.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ConfirmationBoxComponent } from './subscription/confirmation-box/confirmation-box.component';

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
    RecommendationComponent,
    PlaybackOptionsComponent,
    SideNavComponent,
    SubscriptionComponent,
    ConfirmationBoxComponent
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
    FlexLayoutModule,
    NgbModule,
    MatExpansionModule,
    AvatarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FileUploadComponent,
    PlaybackOptionsComponent,
    ConfirmationBoxComponent
  ]
})
export class AppModule { }
