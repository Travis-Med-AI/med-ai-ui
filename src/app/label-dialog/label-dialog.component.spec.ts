import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LabelDialogComponent } from './label-dialog.component';

describe('LabelDialogComponent', () => {
  let component: LabelDialogComponent;
  let fixture: ComponentFixture<LabelDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
