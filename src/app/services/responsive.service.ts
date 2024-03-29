import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  pageDetection$ = new Subject<boolean>();

  change() {
    this.pageDetection$.next(true);
  }

  subscribe(callback: () => void) {
    this.pageDetection$.subscribe(v => callback());
  }
}
