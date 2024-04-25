import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent implements ControlValueAccessor  {
  @Input() options: any[] = [];
  @Input() label?: string;

  constructor(@Self() public ngControl: NgControl){
    this.ngControl.valueAccessor = this;
  }
  writeValue(obj: any): void {}
  registerOnChange(fn: any): void {}
  registerOnTouched(fn: any): void {}

  handleClick(option: string){
    this.control.setValue(option);
  }

  get control(): FormControl {
    return this.ngControl.control as FormControl;
  }
}
