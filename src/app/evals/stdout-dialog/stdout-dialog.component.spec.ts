import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdoutDialogComponent } from './stdout-dialog.component';

describe('StdoutDialogComponent', () => {
  let component: StdoutDialogComponent;
  let fixture: ComponentFixture<StdoutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdoutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
