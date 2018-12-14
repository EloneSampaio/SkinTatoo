import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UserService } from './api/user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private usrService: UserService, 
    private router: Router,
    public afAuth: AngularFireAuth
  ) {
    this.initializeApp();

    this.afAuth.authState.subscribe( user => {
      if (user) {
        this.router.navigateByUrl('/tabs/(home:home)');
      } else {
        this.router.navigateByUrl('/login');
      }
    }, () => {
      this.router.navigateByUrl('/login');
    }
  );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
