import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodayAssaignedComponent } from './view-today-assaigned.component';

describe('ViewTodayAssaignedComponent', () => {
  let component: ViewTodayAssaignedComponent;
  let fixture: ComponentFixture<ViewTodayAssaignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodayAssaignedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodayAssaignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
