import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodayNewWorkflowsComponent } from './view-today-new-workflows.component';

describe('ViewTodayNewWorkflowsComponent', () => {
  let component: ViewTodayNewWorkflowsComponent;
  let fixture: ComponentFixture<ViewTodayNewWorkflowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodayNewWorkflowsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodayNewWorkflowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
