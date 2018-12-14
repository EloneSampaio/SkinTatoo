import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { EstudiosService } from '../api/estudios.service';

@Component({
  selector: 'app-add-servico',
  templateUrl: './add-servico.page.html',
  styleUrls: ['./add-servico.page.scss'],
})
export class AddServicoPage implements OnInit {

  @Input() value: any;

  NomeServico: string;
  Preco: string;

  dados: any = null;

  constructor(
    private stdService: EstudiosService,
    public modalController: ModalController,
    public toastController: ToastController, 
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.stdService.getServico(this.value).subscribe( (res:any) =>{
      if(res != null){
        console.log(res);
        this.dados = res;
        this.NomeServico = res.Nome;
        this.Preco = res.Preco;
      }
    });
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async presentToast(mensagem) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000
    });
    toast.present();
  }

  async excluirServico(){
    const loading = await this.loadingController.create({
      message: 'Excluindo...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.stdService.eliminarServico(this.value).then( () => {
      loading.dismiss();
      this.modalController.dismiss();
      this.presentToast("Servico excluido com sucesso");
    },(err)=>{ 
      loading.dismiss();
      console.log(err);
      this.presentToast("Erro ao excluir o servico");
    });

  }

  async salvar(){
    const loading = await this.loadingController.create({
      message: 'Salvando...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.stdService.addServico(this.NomeServico).then( res => {
      console.log(res);
      loading.dismiss();
      this.modalController.dismiss();
      this.presentToast("Serviço salvo com sucesso!");
    },
    (error) => {
      console.log(error.message);
      loading.dismiss();
    });
  }   
}
