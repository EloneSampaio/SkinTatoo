import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { EstudiosService } from '../api/estudios.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  senha: string;

  isenabled: boolean = false;

  constructor(private router: Router,
              public toastController: ToastController, 
              public loadingController: LoadingController,
              private stdService: EstudiosService) { }

  ngOnInit() {
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async logar(){
    const loading = await this.loadingController.create({
      message: 'Logando...',
      spinner: 'bubbles',
    });
    await loading.present();
    
    this.stdService.signInWithEmail(this.email, this.senha)
        .then( (res) => {
          console.log(res);
          this.router.navigateByUrl('/home');
          loading.dismiss();
        },
        error =>{
          loading.dismiss();
          console.log(error);
          this.presentToast("Email ou senha está errado!");
        });
  }

  criarConta(){
    this.router.navigateByUrl('/cadastrar');
  }
}
