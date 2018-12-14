import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NosPage } from './nos.page';

describe('NosPage', () => {
  let component: NosPage;
  let fixture: ComponentFixture<NosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
