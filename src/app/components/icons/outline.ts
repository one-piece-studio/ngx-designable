import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-outline-svg',
  standalone: true,
  template: `
    <svg
      viewBox="0 0 1024 1024"
      [attr.width]="width"
      [attr.height]="height"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path
        d="M128 96h512a64 64 0 0 1 64 64v64a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64V160a64 64 0 0 1 64-64z m32 64a32 32 0 1 0 0 64h448a32 32 0 0 0 0-64H160z m224 576h512a64 64 0 0 1 64 64v64a64 64 0 0 1-64 64H384a64 64 0 0 1-64-64v-64a64 64 0 0 1 64-64z m32 64a32 32 0 0 0 0 64h448a32 32 0 0 0 0-64H416z m-32-384h512a64 64 0 0 1 64 64v64a64 64 0 0 1-64 64H384a64 64 0 0 1-64-64v-64a64 64 0 0 1 64-64z m32 64a32 32 0 0 0 0 64h448a32 32 0 0 0 0-64H416z"
      ></path>
    </svg>
  `
})
export class OutlineSvg {
  @Input() width: string | number = '1em';

  @Input() height: string | number = '1em';
}
