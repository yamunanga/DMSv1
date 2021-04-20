import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodayApprovedComponent } from './view-today-approved.component';

describe('ViewTodayApprovedComponent', () => {
  let component: ViewTodayApprovedComponent;
  let fixture: ComponentFixture<ViewTodayApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodayApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodayApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
