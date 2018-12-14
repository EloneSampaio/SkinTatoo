import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EstudiosService } from '../api/estudios.service';

@Component({
  selector: 'app-add-galeria',
  templateUrl: './add-galeria.page.html',
  styleUrls: ['./add-galeria.page.scss'],
})
export class AddGaleriaPage implements OnInit {

  @Input() value: any;

  Foto: string = null;
  dados: any = null;
  imgSrc: string;

  constructor(private router: Router,
    private camera: Camera,
    private stdService: EstudiosService,
    public modalController: ModalController,
    public toastController: ToastController, 
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.stdService.getGalery(this.value).subscribe( (res:any) => {
      if(res != null){
        this.dados = res;
        this.Foto = res.Foto;
        this.imgSrc =res.CaminhoIMG;
        console.log(this.dados)
      }
    });
  }

onSelectFile(event) { 
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
         
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.Foto = event.target.result;
      }
    }
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

  async excluirFoto(){
    const loading = await this.loadingController.create({
      message: 'Excluindo...',
      spinner: 'bubbles',
    });
    await loading.present();

  this.stdService.eliminarFoto(this.imgSrc, this.value).then( () => {
    loading.dismiss();
    this.modalController.dismiss();
    this.presentToast("Imagem excluida com sucesso");
  },(err)=>{ 
    loading.dismiss();
    console.log(err);
    this.presentToast("Erro ao excluir a imagem");
  });

  }

  async salvar(){
    const loading = await this.loadingController.create({
      message: 'Salvando...',
      spinner: 'bubbles',
    });
    await loading.present();

    let Dados = { 
      Foto: this.Foto,
      CaminhoIMG: '',
      criadoAos: new Date()
    }

    this.stdService.addFotoGaleria(Dados).then( res => {
      console.log(res);
      loading.dismiss();
      this.modalController.dismiss();
      this.presentToast("Imagem salva com sucesso!");
    },
    (error) => {
      console.log(error.message);
      loading.dismiss();
    });
  }   

}
