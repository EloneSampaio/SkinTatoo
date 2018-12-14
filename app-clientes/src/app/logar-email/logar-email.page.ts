import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-logar-email',
  templateUrl: './logar-email.page.html',
  styleUrls: ['./logar-email.page.scss'],
})
export class LogarEmailPage implements OnInit {

  Email: string;
  Senha: string;

  constructor(private usrService: UserService, private router: Router, public toastController: ToastController, 
    public loadingController: LoadingController,) { }

  ngOnInit() {
  }

  paginaAnterior(){
    this.router.navigateByUrl('/login');
  }
  
  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async logar(){
    if(this.Email === undefined || this.Senha === undefined){
      this.presentToast("Por favor preencha todos os campos")
    }
    else{
      const loading = await this.loadingController.create({
        message: 'Carregando...',
        spinner: 'bubbles',
      });
      await loading.present();
      this.usrService.signInWithEmail(this.Email, this.Senha).then(res => {
        console.log(res);
        this.router.navigateByUrl('/tabs/(home:home)');
        loading.dismiss();
      }, 
      (err)=>{
        console.log(err);
        loading.dismiss();
        this.presentToast("Email ou senha está errado!");
      });
    }


  }

}
