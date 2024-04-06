import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-svg',
  standalone: true,
  template: `
    <svg
      viewBox="0 0 48 48"
      [attr.width]="width"
      [attr.height]="height"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path
        d="M42.5,33 C43.3284271,33 44,33.6715729 44,34.5 C44,35.3284271 43.3284271,36 42.5,36 L5.5,36 C4.67157288,36 4,35.3284271 4,34.5 C4,33.6715729 4.67157288,33 5.5,33 L42.5,33 Z M42.5,22 C43.3284271,22 44,22.6715729 44,23.5 C44,24.3284271 43.3284271,25 42.5,25 L5.5,25 C4.67157288,25 4,24.3284271 4,23.5 C4,22.6715729 4.67157288,22 5.5,22 L42.5,22 Z M42.5,11 C43.3284271,11 44,11.6715729 44,12.5 C44,13.3284271 43.3284271,14 42.5,14 L5.5,14 C4.67157288,14 4,13.3284271 4,12.5 C4,11.6715729 4.67157288,11 5.5,11 L42.5,11 Z"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuSvg {
  @Input() width: string | number = '1em';

  @Input() height: string | number = '1em';
}
