import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  requestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  show() {
    this.requestCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-pulse-sync',
      bdColor: 'rgba(255,255,255,0)',
      color: '#ADD8E6',
    });
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.spinnerService.hide();
    }
  }
}
