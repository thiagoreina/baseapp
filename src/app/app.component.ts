
import { StorageService } from './services/storage.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
    , private storage: StorageService
    , private router: Router
    , public authService: AuthService
  ) {}

  dataStorage: any;

  async initializeApp() {
    this.platform.ready().then(() => {
      this.init
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


  }
async init(){
  await this.storage.get('ACCESS_TOKEN').then(data => {
    if (data) {
      this.authService.authSubject.next(true);
      this.router.navigateByUrl('home');
    } else {
      this.authService.logout()
    }
  })
}
  async ngOnInit() {
    this.init()
  }
}
