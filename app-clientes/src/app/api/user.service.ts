import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
//import AuthProvider = firebase.auth.AuthProvider;
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { map } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userId: string;

  constructor(
    private db: AngularFireDatabase, 
    public afAuth: AngularFireAuth, 
    private fb: FirebaseApp,
    private facebook: Facebook,
    private platform: Platform,
    private googlePlus: GooglePlus
    ) {
    afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid;
        console.log(user)
      }
    });
  }

  
  criarUsuario(dados: any) {
    return this.db.object(`/Usuarios/${this.userId}`).set({
      uid: dados.uid,
      Email: dados.Email,
      NomeSobrenome: dados.NomeSobrenome,
      ImagemPerfil: dados.ImagemPerfil,
      CaminhoIMG: dados.CaminhoIMG,
      Telefone: dados.Telefone, 
      dataCriacao: dados.dataCriacao
    })
  } 

  fazerSolicitacao(dado){
    
    let publicacao = {
      usuarioID: this.userId,
      ImagemCorpo : dado.ImagemCorpo,
      ImagemDesenho: dado.ImagemDesenho,
      Altura :dado.alt,
      Largura :dado.larg,
      NomeServico :dado.NomeServ,
      NomeEstudio: dado.NomeEstudio,
      Status: dado.statusSolicitacao,
      Preco: dado.precoSerco,
      ServicoID: dado.KeyServico,
      EstudioID: dado.keyEstudio
    };

    return this.db.list(`/Solicitacao`).push(publicacao);
    
  }

  minhasSolicitacaos(){
    return this.db.list(`/Solicitacao/`, ref => 
      ref
        .orderByChild('Status')
        .equalTo(`${this.userId}_1`)
      )
      .snapshotChanges()
        .pipe(
          map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }))
  }

  avaliacoes(dados){
    if(!dados.this.chave){
      this.criarAvaliacao(dados);
    }
    else{
      return this.db.object(`/Avaliacoes/${dados.this.chave}`).update({
        valor: dados.valor,
      })
    }
  }

  todasAvaliacoes(){
    return this.db.list(`/Avaliacoes/`)
      .snapshotChanges()
        .pipe(
          map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }))
  }

  atualizar(dados){
    return this.db.object(`/Avaliacoes/${dados.chave}`).update({
      valor: dados.valor,
    })
  }

  criarAvaliacao(dados){
    return this.db.list(`/Avaliacoes`).push({
      usrID: this.userId,
      chave: dados.chave,
      valor: dados.valor,
    });
  }

  excluirSOlicitacao(key){
    return this.db.list(`Solicitacao/`).remove(key).then( res =>{
      console.log("Servico eliminado com sucesso");
    },
    (err) => { console.log("erro ao eliminar o servico") });
  }

  getUsuario() {
    return this.db.object(`/Usuarios/${this.userId}`).valueChanges();
  }

  getSearchedStudio(ID) {
    return this.db.object(`/Estudios/${ID}`).valueChanges();
  }

  getEstudiosDestaque(){
    return this.db.list(`/Estudios/`, ref => 
      ref
        .orderByKey()
        .limitToLast(3)
      ) .valueChanges();
  }

  getEstudios(){
    return this.db.list(`/Estudios/`, ref => 
      ref
        .orderByKey()
        .limitToFirst(8)
      ) .valueChanges();
  }

  getTatuadores(idTatu){
    return this.db.list(`Tatuadores/${idTatu}`)
    .snapshotChanges()
    .pipe(
      map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }))
  }

  getTatuador(Id, key){
    return this.db.object(`Tatuadores/${Id}/${key}`).valueChanges();
  }

  getGaleria(id){
    return this.db.list(`Galeria/${id}`)
    .snapshotChanges()
    .pipe(
      map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }))
  }

  getServicos(id){
    return this.db.list(`Servicos/${id}`)
    .snapshotChanges()
    .pipe(
      map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }))
  }
  
  uploadImagem(dados: any){

    let info: any = { 
      uid: dados.uid,
      Email: dados.Email,
      NomeSobrenome: dados.NomeSobrenome,
      ImagemPerfil: dados.ImagemPerfil,
      CaminhoIMG: '',
      Telefone: dados.Telefone,
      dataCriacao: dados.dataCriacao,
    };

    let storageRef = this.fb.storage().ref();
    let basePath = '/perfilUsuario/' + dados.uid;
    info.CaminhoIMG = basePath + '/' + 'perfil-' + new Date().getTime() + '.jpg';
    let uploadTask = storageRef.child(info.CaminhoIMG).putString(dados.ImagemPerfil,'data_url', { contentType: 'image/jpeg' });

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) =>
    {
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
      console.error(error);
    },
    () => { 

      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        info.ImagemPerfil  = downloadURL;
        console.log('File available at', downloadURL);
      });
        
      setTimeout( () => {
        console.log(info.ImagemPerfil);
        this.criarUsuario(info);
      }, 2000);
        
    });   
  }

  fazerAgendamento(dados){
    return this.db.list(`Agendamentos/`).push({
      UsuarioID: this.userId,
      solicitacaoID: dados.SolicitacaoID,
      EstudioID: dados.stdID,
      userImagemPerfil: dados.ImagemPerfil,
      Data: dados.Data,
      Hora: dados.Hora,
      Servico: dados.Servico,
      Preco: dados.Preco,
      NomeUsuario: dados.NomeUsuario,
      NomeEstudio: dados.NomeEstudio,
      EnderecoEstudio: dados.EnderecoEstudio
    }).then( (res) =>{
      console.log(res);
      this.excluirSOlicitacao(dados.SolicitacaoID);    
    })
  }

  cancelarAGendamento(key){
    return this.db.list(`Agendamentos/`).remove(key).then( res =>{
      console.log("Servico eliminado com sucesso")
    },
    (err) => { console.log("erro ao eliminar o servico") });
  }
  
  getMeusAgendamento(){
    return this.db.list(`/Agendamentos/`, ref => 
      ref
        .orderByChild('UsuarioID')
        .equalTo(this.userId)
      )
      .snapshotChanges()
      .pipe(
        map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }))
  }

  atualizarImagemUsuario(localizacaoIMG: string, imgString: string){
    let storageRef = this.fb.storage().ref();
      return storageRef.child(localizacaoIMG).delete().then( (res: any) => {
        console.log('Imagem do perfil eliminada');

        let basePath = '/perfilUsuario/' + this.userId,
            caminho = basePath + '/' + 'perfil-' + new Date().getTime() + '.jpg',
            uploadTask = storageRef.child(caminho).putString(imgString,'data_url', { contentType: 'image/jpeg' });
        
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          console.error(error);
        },
        () => { 
          let ImagemSRC;
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            ImagemSRC  = downloadURL;
            console.log('File available at', downloadURL);
          });
            
          setTimeout( () => {
            console.log(ImagemSRC);
            return this.db.object(`/Usuarios/${this.userId}`).update({
              ImagemPerfil: ImagemSRC,
              CaminhoIMG: caminho
            }).then(res =>{ 
                console.log('imagem atualizada com sucesso') 
              },(err) =>{ console.log('Erro ao atualizar a imagem' )});
          }, 2000);
            
        });   

      },
      (err) => {
        console.error(err);
      });
  }

  searchEstudios(start: any, end: any){
    return this.db.list('/Estudios', ref => 
      ref
        .orderByChild('Nome')
        .limitToFirst(10)
        .startAt(start )
        .endAt(end ) 
    ).valueChanges();
  }

  signInWithFacebook(): Promise<any> {
    //return this.facebook.login(['email']);
    // return this.facebook.login(['email'])
    // .then( (response: FacebookLoginResponse) => {
    //   const facebookCredential = firebase.auth.FacebookAuthProvider
    //     .credential(response.authResponse.accessToken);
    //    firebase.auth().signInWithCredential(facebookCredential).then( success => { 
    //      console.log("Firebase success: " + JSON.stringify(success)); 
    //    });
    // }).catch((error) => { console.log(error) });
    if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }

  }

  signInWithGoogle() {
    // return new Promise<any>((resolve, reject) => {
    //   let provider = new firebase.auth.GoogleAuthProvider();
    //   provider.addScope('profile');
    //   provider.addScope('email');
    //   this.afAuth.auth.signInWithPopup(provider)
    //   .then(res => {
    //     resolve(res);
    //   })
    // });
    return new Promise((resolve, reject) => { 
      this.googlePlus.login({
        'webClientId': '390960972182-o778c9krdl6br361jskgk0p3c3djolbh.apps.googleusercontent.com',
        'offline': true
      })
      .then( res => {
        const googleCredential = firebase.auth.GoogleAuthProvider
            .credential(res.idToken);

          firebase.auth().signInWithCredential(googleCredential)
        .then( response => {
            console.log("Firebase success: " + JSON.stringify(response));
            resolve(response)
        });
      }, err => {
          console.error("Error: ", err)
          reject(err);
      });
    });
  }

  atualizarDados(dados){
    return this.db.object(`/Usuarios/${this.userId}`).update({
      Email: dados.Email,
      NomeSobrenome: dados.NomeSobrenome,
      Telefone: dados.Telefone
    })
  }

  signInWithEmail(email, password) {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
