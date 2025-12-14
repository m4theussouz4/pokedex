import { Component, ElementRef, signal, ViewChild, WritableSignal } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'poke-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @ViewChild('modal') modalRef!: ElementRef<HTMLDivElement>;

  private bootstrapModal: WritableSignal<Modal | null> = signal<Modal | null>(null);

  constructor() { }

  open() {
    this.bootstrapModal.set(new Modal(this.modalRef.nativeElement));
    this.bootstrapModal().show();
  }

  close() {
    this.bootstrapModal().hide();
  }
}
