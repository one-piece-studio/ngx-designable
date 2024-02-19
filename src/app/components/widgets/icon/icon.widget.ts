import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { usePrefix } from '@/app/utils';
import { ComponentSvg } from '@/app/components/icons/component';
import { IconFactoryProvider } from '@/app/components/icons/icon.factory';
import { IconType } from '@/app/components/icons/icon.type';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [ComponentSvg],
  template: ` <div class="{{ prefix }}"><div #container></div></div> `,
  styleUrls: ['./icon.widget.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconWidget implements OnChanges, AfterViewInit {
  @Input() icon: IconType;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef | undefined;

  prefix = usePrefix('icon');

  constructor(private iconFactoryProvider: IconFactoryProvider) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.icon && changes.icon.currentValue) {
      this.createSvg();
    }
  }

  ngAfterViewInit(): void {
    this.createSvg();
  }

  createSvg() {
    this.iconFactoryProvider.createSvg(this.icon, this.container);
  }
}
