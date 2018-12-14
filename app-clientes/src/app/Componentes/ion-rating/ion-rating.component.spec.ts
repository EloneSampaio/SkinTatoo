import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonRatingComponent } from './ion-rating.component';

describe('IonRatingComponent', () => {
  let component: IonRatingComponent;
  let fixture: ComponentFixture<IonRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
