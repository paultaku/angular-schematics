import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ModalEvent } from './modalEvent';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Service {

  private modal$ = new Subject<ModalEvent>();
  constructor() { }

  public modalAsObservable(): Observable<ModalEvent> {
    return this.modal$.asObservable();
  }

  public open(modalEvent: ModalEvent): void {
    this.modal$.next(modalEvent);
  }
}
