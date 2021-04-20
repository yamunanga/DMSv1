import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodayEndWorkflowsComponent } from './view-today-end-workflows.component';

describe('ViewTodayEndWorkflowsComponent', () => {
  let component: ViewTodayEndWorkflowsComponent;
  let fixture: ComponentFixture<ViewTodayEndWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodayEndWorkflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodayEndWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
