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
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [ComponentSvg, NgOptimizedImage],
  template: `
    <span class="{{ prefix }} {{ classname }}" [style]="style">
      @if (isRegister) {
        <ng-container #container></ng-container>
      } @else {
        <img ngSrc="{{ icon }}" [height]="size" [width]="size" alt="" />
      }
    </span>
  `,
  styleUrls: ['./icon.widget.less', '../../styles/styles.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconWidget implements OnChanges, AfterViewInit {
  @Input() icon: string;

  @Input() size: number | string = '1em';

  @Input() classname: string;

  @Input() style: Partial<CSSStyleDeclaration>;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef | undefined;

  prefix = usePrefix('icon');

  isRegister: boolean = true;

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
    const widget = this.iconFactoryProvider.find(this.icon);
    this.isRegister = !!widget;
    if (widget && this.container) {
      this.container.clear();
      const componentRef = this.iconFactoryProvider.createSvg(this.icon, this.container) as any;
      componentRef.instance.width = this.style?.width || this.size;
      componentRef.instance.height = this.style?.height || this.size;
      componentRef.changeDetectorRef?.detectChanges();
    }
  }
}
