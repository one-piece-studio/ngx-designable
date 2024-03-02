import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';

const ZORRO_MODULES = [NzButtonModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ...ZORRO_MODULES],
  exports: [CommonModule, FormsModule, ...ZORRO_MODULES]
})
export class SharedModule {}
