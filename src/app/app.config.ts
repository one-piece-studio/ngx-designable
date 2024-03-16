import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Engine } from '@/app/core/models';
import { createDesigner } from '@/app/core/externals';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), { provide: Engine, useFactory: createDesigner }]
};
