import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Engine } from '@/app/core/models';
import { createDesigner } from '@/app/core/externals';

const engine = createDesigner();

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), { provide: Engine, useValue: engine }]
};
