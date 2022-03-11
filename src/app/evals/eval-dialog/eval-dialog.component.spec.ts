import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EvalDialogComponent } from './eval-dialog.component';

describe('EvalImageDialogComponent', () => {
  let component: EvalDialogComponent;
  let fixture: ComponentFixture<EvalDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
