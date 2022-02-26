import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrthancComponent } from './orthanc.component';

describe('OrthancComponent', () => {
  let component: OrthancComponent;
  let fixture: ComponentFixture<OrthancComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrthancComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrthancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
