import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { HttpClientModule } from '@angular/common/http';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent, HttpClientModule],
      providers: [
        PokemonService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set showToast to true and hide after 10 seconds', fakeAsync(() => {
    jest.spyOn(component, 'hide');

    component['show']();

    expect(component.showToast()).toBeTruthy();
    tick(10000);
    expect(component.hide).toHaveBeenCalled();
  }));
  
  it('should set showToast to false when hide is called', () => {
    component.showToast.set(true);

    component.hide();

    expect(component.showToast()).toBeFalsy();
  });
});
