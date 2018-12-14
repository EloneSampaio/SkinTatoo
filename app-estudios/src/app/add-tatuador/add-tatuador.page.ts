import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EstudiosService } from '../api/estudios.service';

@Component({
  selector: 'app-add-tatuador',
  templateUrl: './add-tatuador.page.html',
  styleUrls: ['./add-tatuador.page.scss'],
})
export class AddTatuadorPage implements OnInit {

  @Input() value: any

  Nome: string;
  Foto: string;
  Descricao: string;

  dados: any = null;
  imgSrc: string;
  constructor(private router: Router,
              private camera: Camera,
              private stdService: EstudiosService,
              public modalController: ModalController,
              public toastController: ToastController, 
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.stdService.getTatuador(this.value).subscribe( (res:any) =>{
      if(res != null){
        console.log(res);
        this.imgSrc = res.CaminhoIMG;
        this.dados = res;
        this.Foto = res.Foto;
        this.Descricao = res.Descricao;
        this.Nome = res.Nome;
      }
    });
  }

  async takePicture(){

    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'bubbles',
    });
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
    }
 
    this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        loading.present();
        this.Foto = base64Image;
        loading.dismiss();
    },(err) => {
      console.error(err);
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

  async excluirTatuador(){
    const loading = await this.loadingController.create({
      message: 'Excluindo...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.stdService.eliminarTatuador(this.imgSrc, this.value).then( () => {
      loading.dismiss();
      this.modalController.dismiss();
      this.presentToast("Tatuador(a) excluido com sucesso");
    },(err)=>{ 
      loading.dismiss();
      console.log(err);
      this.presentToast("Erro ao excluir o tatuador(a)");
    });

  }

  async salvar(){
    const loading = await this.loadingController.create({
      message: 'Salvando...',
      spinner: 'bubbles',
    });
    await loading.present();

    let Tatuadores = {
      Descricao: this.Descricao, 
      Nome: this.Nome, 
      Foto: this.Foto,
      criadoAos: new Date()
    }

    this.stdService.addTatuador(Tatuadores).then( res => {
      console.log(res);
      loading.dismiss();
      this.modalController.dismiss();
      this.presentToast("Salvo com sucesso!");
    },
    (error) => {
      console.log(error.message);
      loading.dismiss();
    });
  }   

}