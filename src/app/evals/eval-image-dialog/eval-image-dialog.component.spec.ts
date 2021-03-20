import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalImageDialogComponent } from './eval-image-dialog.component';

describe('EvalImageDialogComponent', () => {
  let component: EvalImageDialogComponent;
  let fixture: ComponentFixture<EvalImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
