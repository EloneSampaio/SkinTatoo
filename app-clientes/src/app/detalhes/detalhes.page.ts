import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  Email: string;
  NomeSobrenome: string;
  Telefone: string;
  dados: any = [];

  constructor(
    private usrService: UserService, 
    private router: Router, 
    private alertController: AlertController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.usrService.getUsuario().subscribe( (res: any) => {
      console.log(res);
      this.dados = res;
  
      this.Email = res.Email;
      this.NomeSobrenome = res.NomeSobrenome;
      this.Telefone = res.Telefone;
    })
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async presentAlertEmail() {
    const alert = await this.alertController.create({
      header: 'Alterar E-mail',
      inputs: [
        {
          name: 'email',
          type: 'text',
          value: this.Email,
          placeholder: 'Seu email'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cor',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Salvar',
          cssClass: 'cor',
          handler: (data) => {
            this.dados.Email = data.email
            this.usrService.atualizarDados(this.dados).then( (res) =>{
              console.log(res);
              this.presentToast('Email atualizado com sucesso!')
              console.log("atualizado com sucesso");
            }, (error) => {
              console.log(error);
              this.presentToast('Erro ao atualizar!')
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertNome() {
    const alert = await this.alertController.create({
      header: 'Alterar Nome',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          value: this.NomeSobrenome,
          placeholder: 'Seu Nome'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cor',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Salvar',
          cssClass: 'cor',
          handler: (data) => {
            this.dados.NomeSobrenome = data.nome
            this.usrService.atualizarDados(this.dados).then( (res) =>{
              console.log(res);
              this.presentToast('Nome atualizado com sucesso!')
              console.log("atualizado com sucesso");
            }, (error) => {
              console.log(error);
              this.presentToast('Erro ao atualizar!')
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertTelefone() {
    const alert = await this.alertController.create({
      header: 'Alterar Telefone',
      inputs: [
        {
          name: 'telefone',
          type: 'text',
          value: this.Telefone,
          placeholder: 'Seu Telefone'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'cor',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Salvar',
          cssClass: 'cor',
          handler: (data) => {
            this.dados.Telefone = data.telefone;
            this.usrService.atualizarDados(this.dados).then( (res) =>{
              this.presentToast('Telefone atualizado com sucesso!')
              console.log("atualizado com sucesso");
            }, (error) => {
              console.log(error);
              this.presentToast('Erro ao atualizar!')
            });
          }
        }
      ]
    });

    await alert.present();
  }

  paginaAnterior(){
    this.router.navigateByUrl('/tabs/(perfil:perfil)');
  }
}
