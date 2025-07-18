import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  template: `<h1>{{ greet() }}</h1>`
})
export class GreetingComponent {
  @Input() name: string = '';

  greet(): string {
    return `Hello, ${this.name}!`;
  }
}