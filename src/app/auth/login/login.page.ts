import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { MenuController, LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService
    , private router: Router
    , private storage: StorageService
    , public menuCtrl: MenuController
    , public loadingController: LoadingController
    , public toastController: ToastController
  ) { 
  }

  logo: string = 'assets/logo.png';


  getActiveTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      this.logo = 'assets/logo.png';
    } else {
      this.logo = 'assets/logo.png';
    }
  }

  ionViewWillEnter() {
    this.getActiveTheme();
  }

  async ngOnInit() {
    console.log('ngOnInit')

  }
  

  async login(form) {
    var dataStorage: any
    dataStorage = await this.storage.get('ACCESS_TOKEN')
    this.presentLoading();

    this.authService.login(form.value).subscribe((res) => {
      if (res) {
        this.stopLoading();
        console.log('logiiin', res);

        setTimeout(() => {
          this.router.navigateByUrl('home');
        }, 100);
      } else {
        alert('senha invalida');
        this.stopLoading();
      }
    }, error => {
      this.stopLoading();
      
        this.presentToast(error.error.msg);
     
      

      console.log(error.message)
      console.log(error)
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      //duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  stopLoading() {
    setTimeout( () => {  this.loadingController.dismiss() }, 200 );
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}