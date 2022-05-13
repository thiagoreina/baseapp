import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule
    , IonicModule.forRoot()
    , AppRoutingModule
    , HttpClientModule
    , IonicStorageModule.forRoot({
      name: '__ctappDB',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    , SplashScreen
    , StatusBar
    , HttpClient
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
