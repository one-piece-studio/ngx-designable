import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-source-svg',
  standalone: true,
  template: `
    <svg
      viewBox="0 0 1424 1024"
      [attr.width]="width"
      [attr.height]="height"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect
          fill="var(--dn-brand-color)"
          transform="translate(150.000000, 512.000000) rotate(90.000000) translate(-150.000000, -512.000000) "
          x="-50"
          y="502"
          width="400"
          height="20"
          rx="10"
        ></rect>
        <path
          d="M1344,218 C1388.18278,218 1424,253.81722 1424,298 L1424,726 C1424,770.18278 1388.18278,806 1344,806 L80,806 C35.81722,806 0,770.18278 0,726 L0,298 C0,253.81722 35.81722,218 80,218 L1344,218 Z M1344,238 L80,238 C47.1942859,238 20.5378857,264.328343 20,297.00779 L20,298 L20,726 C20,758.805714 46.328343,785.462114 79.0077903,785.991962 L80,786 L1344,786 C1376.80571,786 1403.46211,759.671657 1404,726.99221 L1404,726 L1404,298 C1404,265.194286 1377.67166,238.537886 1344.99221,238.008038 L1344,238 Z"
          fill="#999999"
          fill-rule="nonzero"
        ></path>
      </g>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSourceSvg {
  @Input() width: string | number = '1em';

  @Input() height: string | number = '1em';
}

@Component({
  selector: 'app-textarea-source-svg',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      [attr.width]="width"
      [attr.height]="height"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          d="M944,0 C988.18278,0 1024,35.81722 1024,80 L1024,944 C1024,988.18278 988.18278,1024 944,1024 L80,1024 C35.81722,1024 0,988.18278 0,944 L0,80 C0,35.81722 35.81722,0 80,0 L944,0 Z M944,20 L80,20 C47.1942859,20 20.5378857,46.328343 20,79.0077903 L20,80 L20,944 C20,976.805714 46.328343,1003.46211 79.0077903,1004 L80,1004 L944,1004 C976.805714,1004 1003.46211,977.671657 1004,944.99221 L1004,944 L1004,80 C1004,47.1942859 977.671657,20.5378857 944.99221,20 L944,20 Z"
          fill="#999999"
          fill-rule="nonzero"
        ></path>
        <path
          d="M947.487373,862.63456 C951.392616,866.539803 951.392616,872.871452 947.487373,876.776695 L876.776695,947.487373 C872.871452,951.392616 866.539803,951.392616 862.63456,947.487373 C858.729317,943.58213 858.729317,937.250481 862.63456,933.345238 L933.345238,862.63456 C937.250481,858.729317 943.58213,858.729317 947.487373,862.63456 Z M912.132034,784.852814 C916.037277,788.758057 916.037277,795.089706 912.132034,798.994949 L798.994949,912.132034 C795.089706,916.037277 788.758057,916.037277 784.852814,912.132034 C780.947571,908.226791 780.947571,901.895142 784.852814,897.989899 L897.989899,784.852814 C901.895142,780.947571 908.226791,780.947571 912.132034,784.852814 Z M876.776695,707.071068 C880.681938,710.976311 880.681938,717.307961 876.776695,721.213203 L721.213203,876.776695 C717.307961,880.681938 710.976311,880.681938 707.071068,876.776695 C703.165825,872.871452 703.165825,866.539803 707.071068,862.63456 L862.63456,707.071068 C866.539803,703.165825 872.871452,703.165825 876.776695,707.071068 Z M150,90 C155.522847,90 160,94.4771525 160,100 L160,380 C160,385.522847 155.522847,390 150,390 C144.477153,390 140,385.522847 140,380 L140,100 C140,94.4771525 144.477153,90 150,90 Z"
          fill="var(--dn-brand-color)"
        ></path>
      </g>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextAreaSourceSvg {
  @Input() width: string | number = '1em';

  @Input() height: string | number = '1em';
}

@Component({
  selector: 'app-card-source-svg',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
      [attr.width]="width"
      [attr.height]="height"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <path
          d="M65,17 L962,17 C990.718807,17 1014,40.281193 1014,69 L1014,267 L1014,267 L13,267 L13,69 C13,40.281193 36.281193,17 65,17 Z"
          fill="#D8D8D8"
        ></path>
        <path
          d="M944,0 C988.18278,0 1024,35.81722 1024,80 L1024,944 C1024,988.18278 988.18278,1024 944,1024 L80,1024 C35.81722,1024 0,988.18278 0,944 L0,80 C0,35.81722 35.81722,0 80,0 L944,0 Z M944,20 L80,20 C47.1942859,20 20.5378857,46.328343 20,79.0077903 L20,80 L20,944 C20,976.805714 46.328343,1003.46211 79.0077903,1004 L80,1004 L944,1004 C976.805714,1004 1003.46211,977.671657 1004,944.99221 L1004,944 L1004,80 C1004,47.1942859 977.671657,20.5378857 944.99221,20 L944,20 Z"
          fill="#999999"
          fill-rule="nonzero"
        ></path>
        <rect
          fill="#999999"
          transform="translate(513.500000, 267.000000) scale(-1, 1) rotate(630.000000) translate(-513.500000, -267.000000) "
          x="503.5"
          y="-233.5"
          width="20"
          height="1001"
          rx="10"
        ></rect>
        <rect
          fill="var(--dn-brand-color)"
          transform="translate(340.000000, 142.000000) scale(-1, 1) rotate(630.000000) translate(-340.000000, -142.000000) "
          x="330"
          y="-108"
          width="20"
          height="500"
          rx="10"
        ></rect>
        <rect
          fill="#999999"
          transform="translate(824.000000, 142.000000) scale(-1, 1) rotate(630.000000) translate(-824.000000, -142.000000) "
          x="814"
          y="42"
          width="20"
          height="200"
          rx="10"
        ></rect>
      </g>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSourceSvg {
  @Input() width: string | number = '1em';

  @Input() height: string | number = '1em';
}
