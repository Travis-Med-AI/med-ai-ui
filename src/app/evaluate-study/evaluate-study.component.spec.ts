import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateStudyComponent } from './evaluate-study.component';

describe('EvaluateStudyComponent', () => {
  let component: EvaluateStudyComponent;
  let fixture: ComponentFixture<EvaluateStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluateStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
