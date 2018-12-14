import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {

  private estudio: Observable<any[]>;
  private user: firebase.User;
  private userId: string;
  private PATH = '/Estudios';
  public dbRef;

  constructor(private db: AngularFireDatabase,
              private storage: AngularFireStorage, 
              public afAuth: AngularFireAuth,
              private fb: FirebaseApp) {

      afAuth.authState.subscribe(user => {
        this.user = user;
        if(user){
          this.userId = user.uid;
          console.log(user)
        }
      });
  }

  addEstudio(dados: any) {
    return this.db.object(`Estudios/${this.userId}`).set(dados);
  }

  getUsuario(IDuser) {
    return this.db.object(`/Usuarios/${IDuser}`).valueChanges();
  }

  getSolicitacao(){
    return this.db.list(`/Solicitacao/`, ref => 
      ref
        .orderByChild('Status')
        .equalTo(0)
      )
      .snapshotChanges()
        .pipe(
          map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }))
  }

  excluirSOlicitacao(key){
    return this.db.list(`Solicitacao/`).remove(key).then( res =>{
      console.log("Servico eliminado com sucesso");
    },
    (err) => { console.log("erro ao eliminar o servico") });
  }

  aceitar(dados){
    return this.db.object(`/Solicitacao/${dados.key}`).update({
      Status: dados.Status,
      Preco: dados.Preco
    });
  }

  agendamentosFeitos(){
    return this.db.list(`/Agendamentos/`, ref => 
      ref
        .orderByChild('EstudioID')
        .equalTo(this.userId)
      )
      .snapshotChanges()
      .pipe(
        map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      }))
  }
  
  getOneSolicitacao(id){
    return this.db.object(`/Solicitacao/${id}`).valueChanges();
    // return this.db.list(`Solicitacao`)
    // .snapshotChanges()
    // .pipe(
    //   map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // }))
  }

  getEstudio() {
    return this.db.object(`Estudios/${this.userId}`).valueChanges();
  }

  addFotoGaleria(dados){
    let info: any = { 
      Foto: '',
      CaminhoIMG: '',
      criadoAos: dados.criadoAos
    };

    let storageRef = this.fb.storage().ref();
    let basePath = '/portifolio/' + this.userId;
    info.CaminhoIMG = basePath + '/' + 'galeria-' + new Date().getTime() + '.jpg';
    let uploadTask = storageRef.child(info.CaminhoIMG).putString(dados.Foto,'data_url', { contentType: 'image/jpeg' });
    
    return new Promise((resolve, reject) => { 
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
        reject(error);
      },
      () => { 

        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          info.Foto  = downloadURL;
          console.log('File available at', downloadURL);
        });
        
        setTimeout( () => {
          console.log(info.Foto);
          this.db.list(`Galeria/${this.userId}`).push(info);
          resolve(uploadTask.snapshot);
        }, 2000);
        
      });
    });
  }

  getGaleria(){
    return this.db.list(`Galeria/${this.userId}`)
    .snapshotChanges()
    .pipe(
      map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }))
  }

  getGalery(key){
    return this.db.object(`Galeria/${this.userId}/${key}`).valueChanges();
  }
  
  // updateCadastro(dados){
  //   let storageRef = this.fb.storage().ref();
  //   return storageRef.child(dados.localizacaoIMG).delete().then( (res: any) => {
  //     console.log('Imagem do perfil eliminada');  

  //     let info: any = {  
  //       Nome: dados.Nome, 
  //       ImagemPerfil: '',
  //       CaminhoIMG: '',
  //       Detalhes: {
  //         Atendimento: dados.Detalhes.Atendimento,
  //         Email: dados.Detalhes.Email,
  //         Endereco: dados.Detalhes.Endereco,
  //         Telefone: dados.Detalhes.Telefone,
  //       } 
  //     };

  //     let storageRef = this.fb.storage().ref();
  //     let basePath = '/ImagensPerfil/' + this.userId;
  //     info.CaminhoIMG = basePath + '/' + 'perfil-' + new Date().getTime() + '.jpg';
  //     let uploadTask = storageRef.child(info.CaminhoIMG).putString(dados.ImagemPerfil,'data_url', { contentType: 'image/jpeg' });
      
  //     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot: any) => {
  //       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + progress + '% done');
  //       switch (snapshot.state) {
  //         case firebase.storage.TaskState.PAUSED: // or 'paused'
  //           console.log('Upload is paused');
  //           break;
  //         case firebase.storage.TaskState.RUNNING: // or 'running'
  //           console.log('Upload is running');
  //           break;
  //       }    
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     () => { 

  //       uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
  //         info.ImagemPerfil  = downloadURL;
  //         console.log('File available at', downloadURL);
  //       });
        
  //       setTimeout( () => {
  //         console.log(info.ImagemPerfil);
  //         //this.addEstudio(info);
  //         this.db.object(`Estudios/${this.userId}`).update(info);
  //         //resolve(uploadTask.snapshot);
  //       }, 2000);
  //     });

  //   });    
  // }

  uploadImagem(dados: any): Promise<any>{

    if(dados.key){
      return this.db.object(`Estudios/${this.userId}`).update(dados);
      //this.updateCadastro(dados);
    }
    else {
      let info: any = { 
        key: this.userId, 
        Nome: dados.Nome, 
        ImagemPerfil: '',
        CaminhoIMG: '',
        Detalhes: {
          Atendimento: dados.Detalhes.Atendimento,
          Email: dados.Detalhes.Email,
          Endereco: dados.Detalhes.Endereco,
          Telefone: dados.Detalhes.Telefone,
        } 
      };

      let storageRef = this.fb.storage().ref();
      let basePath = '/ImagensPerfil/' + this.userId;
      info.CaminhoIMG = basePath + '/' + 'perfil-' + new Date().getTime() + '.jpg';
      let uploadTask = storageRef.child(info.CaminhoIMG).putString(dados.ImagemPerfil,'data_url', { contentType: 'image/jpeg' });
      
      return new Promise((resolve, reject) => { 
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
          reject(error);
        },
        () => { 

          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            info.ImagemPerfil  = downloadURL;
            console.log('File available at', downloadURL);
          });
          
          setTimeout( () => {
            console.log(info.ImagemPerfil);
            this.addEstudio(info);
            resolve(uploadTask.snapshot);
          }, 2000);
          
        });
      });
    }
  }

  addServico(NomeServico){
    return this.db.list(`Servicos/${this.userId}`).push({
      Nome: NomeServico
    });
  }

  getServicos(){
    return this.db.list(`Servicos/${this.userId}`)
    .snapshotChanges()
    .pipe(
      map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }))
  }

  getServico(key){
    return this.db.object(`Servicos/${this.userId}/${key}`).valueChanges();
  }

  eliminarServico(key){
    return this.db.list(`Servicos/${this.userId}/`).remove(key).then( res =>{
      console.log("Servico eliminado com sucesso")
    },
    (err) => { console.log("erro ao eliminar o servico") });
  }

  getTatuadores(){
    return this.db.list(`Tatuadores/${this.userId}`)
    .snapshotChanges()
    .pipe(
      map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    }))
  }

  getTatuador(key){
    return this.db.object(`Tatuadores/${this.userId}/${key}`).valueChanges();
  }

  atualizarTatuador(dados){
    let storageRef = this.fb.storage().ref();
      return storageRef.child(dados.localizacaoIMG).delete().then( (res: any) => {
        console.log('Imagem do perfil eliminada');

        let info: any = { 
          Descricao: dados.Descricao, 
          Nome: dados.Nome, 
          Foto: "",
          CaminhoIMG: '',
          criadoAos: dados.criadoAos
        };

        let storageRef = this.fb.storage().ref();
        let basePath = '/tatuadores/' + this.userId;
        info.CaminhoIMG = basePath + '/' + 'tatuador-' + new Date().getTime() + '.jpg';

        let uploadTask = storageRef.child(info.CaminhoIMG).putString(dados.Foto,'data_url', { contentType: 'image/jpeg' });
        
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
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            info.Foto = downloadURL;
            console.log('File available at', downloadURL);
          });
            
          setTimeout( () => {
            console.log(info.Foto);
            return this.db.object(`/Usuarios/${this.userId}`).update(info).then(res => { 
              console.log('imagem atualizada com sucesso'); 
            },(err) => { 
                console.log('Erro ao atualizar a imagem' )
            });
          }, 2000);

        });   

      },
      (err) => {
        console.error(err);
      });
  }

  addTatuador(dados) {

    //let dataRef = this.db.object(`Tatuadores/${this.userId}/${key}`);

    // if( this.db.object(`Tatuadores/${this.userId}/${key}`) ){
    //   this.atualizarTatuador(dados);
    // } 
    // else{

      let info: any = { 
        Descricao: dados.Descricao, 
        Nome: dados.Nome, 
        Foto: "",
        CaminhoIMG: '',
        criadoAos: dados.criadoAos
      };

      return new Promise((resolve, reject) => { 
        let storageRef = this.fb.storage().ref();
        let basePath = '/tatuadores/' + this.userId;
        info.CaminhoIMG = basePath + '/' + 'tatuador-' + new Date().getTime() + '.jpg';
        let uploadTask = storageRef.child(info.CaminhoIMG).putString(dados.Foto,'data_url', { contentType: 'image/jpeg' });
        
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
        (error) => { reject(error); },
        () => { 
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            info.Foto  = downloadURL;
            console.log('File available at', downloadURL);
          });

          setTimeout( () => {
            console.log(info.Foto);
            this.db.list(`Tatuadores/${this.userId}`).push(info);
            resolve(uploadTask.snapshot);
          }, 2000);
        });
      });
    
  }

  eliminarFoto(localizacaoIMG, key){
    let storageRef = this.fb.storage().ref();
      return storageRef.child(localizacaoIMG).delete().then( (res: any) => {
      console.log('Imagem do perfil eliminada');
      this.db.list(`Galeria/${this.userId}/`).remove(key).then( res =>{
        console.log("Foto eliminada com sucesso")
      },
      (err) => { console.log("erro ao remover a foto") });
    });
  }

  eliminarTatuador(localizacaoIMG, key){
    let storageRef = this.fb.storage().ref();
      return storageRef.child(localizacaoIMG).delete().then( (res: any) => {
      console.log('Imagem do perfil eliminada');
      this.db.list(`Tatuadores/${this.userId}/`).remove(key).then( res =>{
        console.log("Tatuador eliminado com sucesso")
      },
      (err) => { console.log("erro ao remover o post") });
    });
  }
  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  signInWithEmail(email, password) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  
  signUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  get authenticated(): boolean {
    return this.user !== null;
  }
}
