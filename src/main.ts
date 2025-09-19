import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';   //s

import { ActivatedRoute } from '@angular/router';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

  // const routes =[
  //  // {path:'products', component:ProductList},
  //   {path:'products/:id', component:ProductDetail}
  // ];

  // bootstrapApplication(App,{
  //   providers : [
  //     provideHttpClient()
  //   ]
  // }).catch((err) => console.error(err));
