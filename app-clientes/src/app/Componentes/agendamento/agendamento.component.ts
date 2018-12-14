import { Component, OnInit } from '@angular/core';
import { UserService } from '../../api/user.service';
import { AlertController, ToastController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss']
})
export class AgendamentoComponent implements OnInit {

  NomeEstudio: string;
  id: string;

  dados: any = [];

  constructor(
    private usrService: UserService, 
    public toastController: ToastController, 
    public loadingController: LoadingController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.usrService.getMeusAgendamento().subscribe( (res:any) => {
      if(res != null){
        console.log(res);
        this.dados = res;
      }
    });  
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async cancelar(key) {

    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que quer cancelar?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {

            this.usrService.cancelarAGendamento(key).then( (res) => {
              console.log(res);
              this.presentToast('Agendamento cancelado com sucesso!');
            },(err) => {
              console.log(err);
              this.presentToast('Erro ao cancelar o agendamento');
            });
          }
        }
      ]
    });

    await alert.present();
  }

}
