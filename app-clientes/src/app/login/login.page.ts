import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private usrService: UserService, private router: Router, public toastController: ToastController, 
              public loadingController: LoadingController,) { }

  ngOnInit() {
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async loginFacebook(){
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'bubbles',
    });
    await loading.present();
    this.usrService.signInWithFacebook().then(res => {
      alert("success"+res);
      //this.router.navigateByUrl('/tabs/(home:home)');
      loading.dismiss();
    }, 
    (err)=>{
      alert("Erro"+err);
      loading.dismiss();
      this.presentToast('Erro ao logar com Facebook');
    });
  }

  async loginGoogle(){
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'bubbles',
    });
    await loading.present();
    this.usrService.signInWithGoogle().then(res => {
      alert("sucesso "+res);
      //this.router.navigateByUrl('/tabs/(home:home)');
      loading.dismiss();
    }, 
    (err)=>{
      alert("erro "+err);
      loading.dismiss();
      this.presentToast('Erro ao logar com Google');
    });
  }

  loginEmail(){
    this.router.navigateByUrl('/logarEmail');
  }

  criarConta(){
    this.router.navigateByUrl('/cadastrar');
  }

}
