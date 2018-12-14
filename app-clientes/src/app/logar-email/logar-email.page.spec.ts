import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogarEmailPage } from './logar-email.page';

describe('LogarEmailPage', () => {
  let component: LogarEmailPage;
  let fixture: ComponentFixture<LogarEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogarEmailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogarEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
