import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudioPage } from './estudio.page';

describe('EstudioPage', () => {
  let component: EstudioPage;
  let fixture: ComponentFixture<EstudioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
