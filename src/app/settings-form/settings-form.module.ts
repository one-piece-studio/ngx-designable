import { NgModule } from '@angular/core';
import { SettingsFormComponent } from './settings-form.component';
import { DelonFormModule } from '@delon/form';
import { SharedModule } from '../shared/shared.module';
import { NodePathWidget } from '@/app/components/widgets/node-path/node-path.widget';

@NgModule({
  declarations: [SettingsFormComponent],
  imports: [SharedModule, DelonFormModule.forRoot(), NodePathWidget],
  exports: [SettingsFormComponent]
})
export class SettingsFormModule {}
