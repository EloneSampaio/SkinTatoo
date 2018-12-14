import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGaleriaPage } from './add-galeria.page';

describe('AddGaleriaPage', () => {
  let component: AddGaleriaPage;
  let fixture: ComponentFixture<AddGaleriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGaleriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGaleriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
