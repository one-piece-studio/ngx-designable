import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [],
  template: ` <p>designer works!</p> `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignerComponent {}
