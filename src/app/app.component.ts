import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '@/app/shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'ngx-designable';
}
