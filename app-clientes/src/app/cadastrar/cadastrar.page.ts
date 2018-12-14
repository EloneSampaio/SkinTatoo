import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  Email: string;
  NomeSobrenome: string;
  Telefone: string;
  Senha: string; 
  ImagemPerfil: string = null;

  constructor(
    private usrService: UserService,
    private router: Router, 
    public toastController: ToastController, 
    public loadingController: LoadingController,
    private camera: Camera,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
  }

  //  onSelectFile(event) { 
  //     if (event.target.files && event.target.files[0]) {
  //       var reader = new FileReader();

  //       reader.readAsDataURL(event.target.files[0]); // read file as data url

  //       reader.onload = (event) => { // called once readAsDataURL is completed
  //         this.ImagemPerfil = event.target.result;
  //       }
  //     }
  // }  

  async takePicture(photoFrom){

    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'bubbles',
    });
    
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : photoFrom,
      cameraDirection: this.camera.Direction.FRONT
    }
 
    this.camera.getPicture(options).then((imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        loading.present();
        this.ImagemPerfil = base64Image;
        loading.dismiss();
    },(err) => {
      console.error(err);
    });
    
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Carregar foto apartir da...",
      buttons: [ 
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }, 
        {
          text: 'Galeria',
          icon: 'photos',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, 
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();
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

    this.usrService.signUp(this.Email, this.Senha).then( (res: any) => {
      console.log(res);
      console.log("email e senha criado");

      let dados = {
        uid:  res.user.uid,
        Email: this.Email,
        ImagemPerfil: this.ImagemPerfil,
        NomeSobrenome: this.NomeSobrenome,
        Telefone: this.Telefone,
        dataCriacao: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }

      this.usrService.uploadImagem(dados);
    
      loading.dismiss();
      this.router.navigateByUrl('/tabs/(home:home)');
    },
    (error) => {
      console.log(error.message);
      this.presentToast('Erro ao se cadastrar');
      loading.dismiss();
    });
  }

}
