import { Component, Input, OnChanges, SimpleChanges, signal, computed } from '@angular/core';
import { usePrefix } from '@/app/utils';
import { IResource, IResourceLike } from '@/app/core/types';
import { TextWidget } from '@/app/components/widgets/text/text.widget';
import { IconWidget } from '@/app/components/widgets/icon/icon.widget';
import { NgOptimizedImage, NgStyle } from '@angular/common';
import { isResourceList } from '@/app/core/externals';

@Component({
  selector: 'app-resource',
  template: `
    <div class="{{ prefix }}  {{ expand() ? 'expand' : '' }}">
      <div class="{{ prefix }}-header" (click)="expandChange($event)">
        <div class="{{ prefix }}-header-expand">
          <app-icon icon="Expand"></app-icon>
        </div>
        <div class="{{ prefix }}-header-content">
          <app-text [title]="title"></app-text>
        </div>
      </div>
      <div class="{{ prefix }}-content-wrapper">
        <div class="{{ prefix }}-content">
          @for (source of signalSources(); track source) {
            <div class="{{ prefix }}-item" [attr.data-designer-source-id]="source.node.id">
              @if (source.thumb) {
                <img class="{{ prefix }}-item-thumb" [src]="source.thumb" alt="" />
              }
              @if (source.icon) {
                <app-icon
                  class="{{ prefix }}-item-icon"
                  [style]="{ width: '150', height: '40' }"
                  [icon]="source.icon"
                ></app-icon>
              }
              <span class="{{ prefix }}-item-text">
                <app-text [title]="source.title"></app-text>
              </span>
            </div>
          }
          @if (remainItems()) {
            <div class="{{ prefix }}-item-remain" [style.grid-column-start]="gridColumnStart()"></div>
          }
        </div>
      </div>
    </div>
  `,
  standalone: true,
  styleUrls: ['./resource.widget.less'],
  imports: [TextWidget, IconWidget, NgStyle, NgOptimizedImage]
})
export class ResourceWidget implements OnChanges {
  prefix = usePrefix('resource');

  expand = signal(true);

  @Input() title: string | undefined;

  @Input() sources: IResourceLike[];

  remainItems = signal(0);

  signalSources = signal<IResource[]>([]);

  gridColumnStart = computed(() => `span ${3 - this.remainItems()}`);

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sources && changes.sources.currentValue) {
      this.signalSources.set(
        this.sources.reduce((buf, source) => {
          if (isResourceList(source)) {
            return buf.concat(source);
          }
          return buf;
        }, [])
      );
      this.remainItems.set(
        this.signalSources().reduce((length, source) => {
          return length + (source.span ?? 1);
        }, 0) % 3
      );
    }
  }

  expandChange(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.expand.update(v => !v);
  }
}
