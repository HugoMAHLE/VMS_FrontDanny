import { Injectable } from '@angular/core';
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  private keyboard!: Keyboard;
  private keyboardContainerId = 'keyboard-container';

  constructor() {}

  createKeyboard() {
    console.log('Creating keyboard...');
    const keyboardContainer = document.createElement('div');
    keyboardContainer.id = 'keyboard-container';
    keyboardContainer.style.position = 'fixed';
    keyboardContainer.style.bottom = '0';
    keyboardContainer.style.left = '50%';
    keyboardContainer.style.transform = 'translateX(-50%)';
    keyboardContainer.style.zIndex = '9999';
    keyboardContainer.style.background = 'white';

    console.log('Appending keyboard container to body...');
    document.body.appendChild(keyboardContainer);

    this.keyboard = new Keyboard('#keyboard-container', {
      onChange: (input) => this.onChange(input),
      onKeyPress: (button) => this.onKeyPress(button),
    });

    console.log('Keyboard created:', this.keyboard);
  }

  isKeyboardCreated(): boolean {
    return !!this.keyboard;
  }

  onChange(input: string) {
    console.log('Input changed:', input);
  }

  onKeyPress(button: string) {
    console.log('Button pressed:', button);
  }

  showKeyboard() {
    const keyboardContainer = document.getElementById(this.keyboardContainerId);
    if (keyboardContainer) {
      keyboardContainer.style.display = 'block'; // Make sure it's visible
      console.log('Keyboard shown');
    } else {
      console.error('Keyboard container not found');
    }
  }

  hideKeyboard() {
    const keyboardContainer = document.getElementById(this.keyboardContainerId);
    if (keyboardContainer) {
      keyboardContainer.style.display = 'none'; // Hide the keyboard
    }
  }
}
