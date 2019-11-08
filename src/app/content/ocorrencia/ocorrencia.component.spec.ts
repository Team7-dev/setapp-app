import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaComponent } from './ocorrencia.component';

describe('OcorrenciaComponent', () => {
  let component: OcorrenciaComponent;
  let fixture: ComponentFixture<OcorrenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcorrenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcorrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
