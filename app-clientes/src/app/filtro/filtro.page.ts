import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs'

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.page.html',
  styleUrls: ['./filtro.page.scss'],
})
export class FiltroPage implements OnInit {

  dados: any = [];

  constructor(private usrService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSearchType(value: any) {

    if(value.trim() == ""){
      this.dados = null;
    }
    else {
      let startAt = value;
      let endAt = startAt + "\uf8ff";

      this.usrService.searchEstudios(startAt, endAt).subscribe( res =>{
        console.log(res);
        this.dados = res;
      });
    }
    console.log(value);
  }

  verItem(key){
    console.log(key);
    this.router.navigate(['/estudio/' + key]);
  }

}
