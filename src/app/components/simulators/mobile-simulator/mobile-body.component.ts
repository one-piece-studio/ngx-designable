import { ChangeDetectionStrategy, Component } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { Engine, Screen } from '@/app/core/models';
import { NgOptimizedImage, NgStyle } from '@angular/common';

@Component({
  selector: 'app-mobile-body',
  template: `
    <div
      class="{{ prefix }}"
      [ngStyle]="{
        alignItems: screen.flip ? 'center' : '',
        minWidth: screen.flip ? 1000 : 0
      }"
    >
      <div
        class="{{ prefix }}-wrapper"
        [ngStyle]="{
          position: 'relative',
          minHeight: screen.flip ? 0 : 1000
        }"
      >
        <img
          [src]="screen.flip ? MockupImages[theme][0] : MockupImages[theme][1]"
          alt=""
          [ngStyle]="{
            display: 'block',
            margin: '20px 0',
            width: screen.flip ? 946.667 : 460,
            height: screen.flip ? 460 : 946.667,
            boxShadow: '0 0 20px #0000004d',
            borderRadius: '60px',
            backfaceVisibility: 'hidden'
          }"
        />
        <div class="{{ prefix }}-content" [style]="getContentStyles()">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  styleUrls: ['./mobile-simulator.component.less'],
  imports: [NgOptimizedImage, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileBodyComponent {
  prefix = usePrefix('mobile-simulator-body');

  screen: Screen;

  MockupImages = {
    dark: [
      '//img.alicdn.com/imgextra/i3/O1CN01zXMc8W26oJZGUaCK1_!!6000000007708-55-tps-946-459.svg',
      '//img.alicdn.com/imgextra/i3/O1CN012KWk2i1DLduN7InSK_!!6000000000200-55-tps-459-945.svg'
    ],
    light: [
      '//img.alicdn.com/imgextra/i4/O1CN01vuXGe31tEy00v2xBx_!!6000000005871-55-tps-946-459.svg',
      '//img.alicdn.com/imgextra/i4/O1CN01ehfzMc1QPqY6HONTJ_!!6000000001969-55-tps-459-945.svg'
    ]
  };

  theme: string = 'light';

  constructor(private designer: Engine) {
    this.screen = designer.screen;
  }

  getContentStyles = () => {
    if (this.screen.flip) {
      return {
        position: 'absolute',
        width: '736px',
        height: '414px',
        top: '43.3333px',
        left: '106.667px',
        overflow: 'hidden'
      };
    }
    return {
      position: 'absolute',
      width: '414px',
      height: '736px',
      top: '126.667px',
      left: '23.3333px',
      overflow: 'hidden'
    };
  };
}
