import { Component } from '@angular/core';
import { DesignerComponent } from '../../components/container/designer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DesignerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {}
