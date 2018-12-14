import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ion-rating',
  templateUrl: './ion-rating.component.html',
  styleUrls: ['./ion-rating.component.scss']
})
export class IonRatingComponent implements OnInit {

  @Input() numStars: number = 5;
  @Input() value: number = 2.5;

  stars: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    let tmp = this.value;
    
    for(let i = 0; i < this.numStars; i++){
      if(tmp >= 1){
        this.stars.push("star");
      }
      else if(tmp > 0 && tmp < 1){
        this.stars.push("star-half");
      }
      else{
        this.stars.push("star-outline");
      }
    }
  }

}
