import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nos',
  templateUrl: './nos.page.html',
  styleUrls: ['./nos.page.scss'],
})
export class NosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  paginaAnterior(){
    this.router.navigateByUrl('/tabs/(perfil:perfil)');
  }
}
