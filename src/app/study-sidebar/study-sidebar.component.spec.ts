import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudySidebarComponent } from './study-sidebar.component';

describe('StudySidebarComponent', () => {
  let component: StudySidebarComponent;
  let fixture: ComponentFixture<StudySidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StudySidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
