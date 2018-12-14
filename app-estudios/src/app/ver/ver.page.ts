import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { EstudiosService } from '../api/estudios.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.page.html',
  styleUrls: ['./ver.page.scss'],
})
export class VerPage implements OnInit {

  @Input() solKey: any;
  @Input() usuarioID: any;

  Imagem: string;
  NomePerfil: string;

  ImagemCorpo: string;
  ImagemDesenho: string;
  NomeServico: string;
  Largura: string;
  Altura: string;

  Preco: string;

  constructor(
    private stdService: EstudiosService,
    public modalController: ModalController,
    public toastController: ToastController, 
    public loadingController: LoadingController) { }

  ngOnInit() {
    console.log(this.solKey);
    console.log(this.usuarioID);
    this.stdService.getOneSolicitacao(this.solKey).subscribe( (res:any)=>{
      console.log(res);
      this.ImagemCorpo = res.ImagemCorpo;
      this.NomeServico = res.NomeServico;
      this.ImagemDesenho = res.ImagemDesenho;
      this.Altura = res.Altura;
      this.Largura = res.Largura;
    });

    this.stdService.getUsuario(this.usuarioID).subscribe((res:any) =>{
      console.log(res);
      this.Imagem = res.ImagemPerfil;
      this.NomePerfil = res.NomeSobrenome;
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

  async aceitar(){
    const loading = await this.loadingController.create({
      message: 'Aguarde...',
      spinner: 'bubbles',
    });
    await loading.present();
    
    let dados = {
      key: this.solKey,
      Preco: this.Preco,
      Status: `${this.usuarioID}_1`
    }

    this.stdService.aceitar(dados).then( (res:any) =>{
      loading.dismiss();
     this.modalController.dismiss();
     this.presentToast("Enviado com sucesso, aguarde a decisão do cliente");
    },(err)=>{ 
      loading.dismiss();
      console.log(err);
      this.presentToast("Ocorreu algum erro tente novamente!");
    });
  }


}
