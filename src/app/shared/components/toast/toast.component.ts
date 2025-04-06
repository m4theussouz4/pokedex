import { Component, signal, WritableSignal } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { CommonModule } from '@angular/common';
import { Unsubscribe } from '../../../core/decorators/unsubscribe.decorator';
import { Unsubscribable } from 'rxjs';

@Unsubscribe()
@Component({
  selector: 'poke-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  public showToast: WritableSignal<boolean> = signal<boolean>(false);
  public message: WritableSignal<string> = signal<string>('');

  private subscriber: Unsubscribable;

  constructor(private pokemonService: PokemonService){
    this.subscriber = this.pokemonService.currentMessage.subscribe(text => {
      if(text) {
        this.message.set(text)
        this.show();
      }
    });
  }

  private show() {
    this.showToast.set(true);
    setTimeout(() => this.hide(), 10000);
  }

  hide() {
    this.showToast.set(false);
  }
}
