import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewExperimentComponent } from './new-experiment.component';

describe('NewExperimentComponent', () => {
  let component: NewExperimentComponent;
  let fixture: ComponentFixture<NewExperimentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewExperimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
