import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstudiosService } from '../api/estudios.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  dados: any[];
  imageSrc: any = null;

  Email: string;
  Senha: string;
  Nome_Estudio: string;
  Endereco: string;

  constructor(private router: Router, 
              private stdService: EstudiosService,
              public toastController: ToastController, 
              public loadingController: LoadingController) { }

  ngOnInit(){
  //   this.stdService.getEstudios().subscribe( res => {
  //     this.dados = res;
  //     console.log(res)
  //   })
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  paginaAnterior(){
    this.router.navigateByUrl('/login');
  }

  async cadastar(){

    const loading = await this.loadingController.create({
      message: 'Cadastrando...',
      spinner: 'bubbles',
    });
    await loading.present();

    
    this.stdService.signUp(this.Email, this.Senha).then( (res) => {
      console.log(res);
      loading.dismiss();
      this.router.navigateByUrl('/home');
    },
    (error) => {
      console.log(error.message);
      loading.dismiss();
    });
  }

}
