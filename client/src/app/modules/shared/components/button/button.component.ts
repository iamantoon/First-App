import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label: string = '';
  @Input() primary: boolean = true;
  @Input() buttonType: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;

  public get buttonClass(): string[] {
    const mode = this.primary ? 'button--primary' : 'button--secondary';
    return ['button', `button--${this.buttonType}`, mode]
  }
}
