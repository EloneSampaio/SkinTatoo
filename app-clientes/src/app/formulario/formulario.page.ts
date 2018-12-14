import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../api/user.service';
import { ModalController, ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import AuthProvider = firebase.auth.AuthProvider;
import 'firebase/storage';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  @Input() ServKey:    string;
  @Input() NomeServ:   string;
  @Input() PrecoServ:  string;
  @Input() EstudioKey: string;
  @Input() NomeStd:    string;

  ImagemCorpo: string;
  ImagemDesenho: string;
  altura: string;
  largura: string;

  ImagensRef:any = ['','']; 

  constructor(
    private usrService: UserService, 
    private camera: Camera,
    public modalController: ModalController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private fb: FirebaseApp,
    private router: Router,
    private actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    console.log(this.ServKey)
    console.log(this.NomeServ)
    console.log(this.PrecoServ)
    console.log(this.EstudioKey)
    console.log(`Nome estudio: ${this.NomeStd}`);
  }

  async takePicture(){
    
    let that = this;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.CAMERA
    }
    
    this.camera.getPicture(options).then( async (imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData; 
        
      const loading = await this.loadingController.create({
        message: 'Carregando Imagem...',
        spinner: 'bubbles',
      });
  
      await loading.present();

      let storageRef = this.fb.storage().ref();
      let basePath = '/ImagensSolicitacao/';
      let Caminho = basePath + '/' + 'Corpo-' + new Date().getTime() + '.jpg';
      let uploadTask = storageRef.child(Caminho).putString(base64Image,'data_url',{ contentType: 'image/jpeg' });

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }    
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      },() => { 
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            that.ImagemCorpo = base64Image;
            that.ImagensRef[0] = downloadURL;
            console.log(that.ImagensRef[0]);
        });
        loading.dismiss();
      }); 
    },(err) => {
      console.error(err);
      this.presentToast("Erro ao carregar a imagem");
    });
  }

  async takePicture2(imageFrom){
    
    let that = this;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : imageFrom
    }
 
    this.camera.getPicture(options).then(async (imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData; 

      const loading = await this.loadingController.create({
        message: 'Carregando Imagem...',
        spinner: 'bubbles',
      });
      await loading.present();

      let storageRef = this.fb.storage().ref();
      let basePath = '/ImagensSolicitacao/';
      let Caminho = basePath + '/' + 'Corpo-' + new Date().getTime() + '.jpg';
      let uploadTask = storageRef.child(Caminho).putString(base64Image,'data_url',{ contentType: 'image/jpeg' });

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }    
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      },() => { 
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            that.ImagemDesenho = base64Image;
            loading.dismiss();
            that.ImagensRef[1] = downloadURL;
            console.log(that.ImagensRef[1]);
        });
      }); 
    },(err) => {
      console.error(err);
      this.presentToast("Erro ao carregar a imagem");
    });
  }

  dismiss(){
    this.modalController.dismiss();
  }

  async presentActionSheet1() {
    const actionSheet = await this.actionSheetController.create({
      header: "Carregar foto apartir da...",
      buttons: [ 
        {
          text: 'Câmera',
          icon: 'camera',
          handler: () => {
            this.takePicture2(this.camera.PictureSourceType.CAMERA);
          }
        }, 
        {
          text: 'Galeria',
          icon: 'photos',
          handler: () => {
            this.takePicture2(this.camera.PictureSourceType.PHOTOLIBRARY);
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

  async solicitar(){

    if(this.ImagensRef[0] == "" || this.ImagensRef[1] == "" || this.altura == undefined || this.largura == undefined){
      this.presentToast('Carregue as imagens e preencha os campos!');
    } 
    else {
      const loading = await this.loadingController.create({
        message: 'Aguarde...',
        spinner: 'bubbles',
      });
      await loading.present();
  
      let publicacao = {
        ImagemCorpo: this.ImagensRef[0],
        ImagemDesenho: this.ImagensRef[1],
        alt: this.altura,
        larg: this.largura,
        NomeServ: this.NomeServ,
        NomeEstudio: this.NomeStd,
        statusSolicitacao: 0,
        precoSerco: this.PrecoServ,
        KeyServico: this.ServKey,
        keyEstudio: this.EstudioKey
      }
  
      this.usrService.fazerSolicitacao(publicacao).then( (res:any) =>{
        loading.dismiss();
        this.presentToast('Solicitação feita com sucesso!'); 
        console.log(res);
        this.modalController.dismiss();
      },(err)=>{
        loading.dismiss();
        this.presentToast('Erro ao fazer a solicitacao!');
        console.log(err);
      });
    }

  }
}
