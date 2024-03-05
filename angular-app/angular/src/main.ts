import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport()], 
}).catch((err) => console.error(err));
