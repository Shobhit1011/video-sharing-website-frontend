import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoaderService } from '../components/shared/loader/loader.service';
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(public loaderService: LoaderService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes("getAllVideos") || req.url.includes("/videos/count")){
            req = req.clone({
                withCredentials: true
            });
            return next.handle(req);
        }
        else{
            this.loaderService.show();
            req = req.clone({
                withCredentials: true
            });
            return next.handle(req).pipe(
                finalize(() => this.loaderService.hide())
            );
        }
    }
}