import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() placeholder: string = '';
  @Input() primary: boolean = true;
  @Input() inputType: 'primary' | 'secondary' = 'primary';

  public get inputClass(): string[] {
    const mode = this.primary ? 'input--primary' : 'input--secondary';
    return ['input', `input--${this.inputType}`, mode]
  }
}
