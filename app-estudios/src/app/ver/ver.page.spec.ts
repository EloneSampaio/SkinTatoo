import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPage } from './ver.page';

describe('VerPage', () => {
  let component: VerPage;
  let fixture: ComponentFixture<VerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
