import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnityModule } from './unity/unity.module';
import { UnityService } from './unity/unity.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, UnityModule, NgxsModule.forRoot()],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      multi: true,
      deps: [UnityService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
