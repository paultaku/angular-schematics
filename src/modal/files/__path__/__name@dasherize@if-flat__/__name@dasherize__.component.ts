import { Component, TemplateRef, ViewChild, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { <%= classify(name) %>Service } from './<%= classify(name) %>.service';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ModalEvent } from './modalEvent';
import { Subscription } from 'rxjs';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.<%= styleext %>']
})
export class <%= classify(name) %>Component implements OnInit, OnDestroy {
  public modalEvent: ModalEvent;

  private subscription: Subscription;
  private overlayRef: OverlayRef;
  @ViewChild('modal') modalRef: TemplateRef<any>;
  constructor(private modalService: <%= classify(name) %>Service,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically()
      .width('500px');

    const config = new OverlayConfig({
      hasBackdrop: true,
      positionStrategy,
    });
    const overlayRef = this.overlay.create(config);

    this.initialize(overlayRef);
    this.overlayRef = overlayRef;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  close() {
    this.overlayRef.detach();
  }

  private initialize(overlayRef: OverlayRef) {
    this.subscription = this.modalService
      .modalAsObservable()
      .subscribe((modalEvent: ModalEvent) => {
        this.modalEvent = modalEvent;
        overlayRef.attach(new TemplatePortal(this.modalRef, this.viewContainerRef));
      });
  }

}
