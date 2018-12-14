import { Component, OnInit } from '@angular/core';
import { UserService } from '../../api/user.service';
import { AlertController, ToastController,LoadingController } from '@ionic/angular';
import { ConfirmarPage } from '../../confirmar/confirmar.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pendencias',
  templateUrl: './pendencias.component.html',
  styleUrls: ['./pendencias.component.scss']
})
export class PendenciasComponent implements OnInit {

  Dados: any = [];
  Usuarios: any = [];

  NomeEstudio: string;
  
  constructor(
    private usrService: UserService, 
    public toastController: ToastController, 
    public loadingController: LoadingController,
    public modalController: ModalController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.usrService.minhasSolicitacaos().subscribe( (res:any) =>{
      this.Dados = res;
      console.log(res);
    });
  }

  async agendar(Nome, Preco, key, stdID){
    console.log("aceite");
    const modal = await this.modalController.create({
      component: ConfirmarPage,
      componentProps: { 
        SoliticKey:key,
        NomeServ: Nome,
        PrecoServ: Preco,
        EstudioID: stdID
      }
    });
    return await modal.present();
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async excluir(key){
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.usrService.excluirSOlicitacao(key).then( (res:any) =>{
      loading.dismiss();
     this.modalController.dismiss();
     this.presentToast("Solicitacão não aceite com sucesso");
    },(err)=>{ 
      loading.dismiss();
      console.log(err);
      this.presentToast("Ocorreu um erro");
    });
  }

}
