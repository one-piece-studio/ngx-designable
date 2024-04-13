import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

const ZORRO_MODULES = [
  NzButtonModule,
  NzEmptyModule,
  NzRadioModule,
  NzInputModule,
  NzInputNumberModule,
  NzBreadCrumbModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ...ZORRO_MODULES],
  exports: [CommonModule, FormsModule, ...ZORRO_MODULES]
})
export class SharedModule {}
