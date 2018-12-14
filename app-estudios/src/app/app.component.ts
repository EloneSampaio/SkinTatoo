import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { EstudiosService } from './api/estudios.service';
import { ToastController, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Cadastro',
      url: '/perfil',
      icon: 'person'
    },
    {
      title: 'Solicitações',
      url: '/solicitacao',
      icon: 'clipboard'
    },
    {
      title: 'Agendamentos',
      url: '/agendamentos',
      icon: 'calendar'
    }
  ];

  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    private stdService: EstudiosService,
    public menuCtrl: MenuController,
    public toastController: ToastController, 
    public loadingController: LoadingController
    ) {
           
      this.afAuth.authState.subscribe( user => {
        if (user) {
          this.router.navigateByUrl('/home');
        } else {
          this.router.navigateByUrl('/login');
        }
      }, () => {
        this.router.navigateByUrl('/login');
      });

      this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async logout(){

    const loading = await this.loadingController.create({
      message: 'Saindo...',
      spinner: 'bubbles',
    });

    await loading.present();

    this.stdService.signOut().then(res => {
      console.log('sai com sucesso');
      this.menuCtrl.close();
      this.router.navigateByUrl('/login');
      loading.dismiss();
    }, 
    (err) => {
      console.log(err);
      this.presentToast('Erro ao sair!');
      loading.dismiss();
    })
  }

}
