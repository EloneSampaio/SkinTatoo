import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServicoPage } from './add-servico.page';

describe('AddServicoPage', () => {
  let component: AddServicoPage;
  let fixture: ComponentFixture<AddServicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
