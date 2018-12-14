import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TatuadorPage } from './tatuador.page';

describe('TatuadorPage', () => {
  let component: TatuadorPage;
  let fixture: ComponentFixture<TatuadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TatuadorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TatuadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
