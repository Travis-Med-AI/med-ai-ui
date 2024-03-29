import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExperimentAnalysisComponent } from './experiment-analysis.component';

describe('ExperimentAnaylsisComponent', () => {
  let component: ExperimentAnalysisComponent;
  let fixture: ComponentFixture<ExperimentAnalysisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
