import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private messageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  setToastMessage(newData: string) {
    this.messageSource.next(newData);
  }

  getCurrentData(): string {
    return this.messageSource.getValue();
  }
}
