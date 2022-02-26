import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EvalsComponent } from './evals.component';

describe('EvalsComponent', () => {
  let component: EvalsComponent;
  let fixture: ComponentFixture<EvalsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
