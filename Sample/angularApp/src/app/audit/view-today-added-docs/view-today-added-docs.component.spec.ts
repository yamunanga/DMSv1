import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodayAddedDocsComponent } from './view-today-added-docs.component';

describe('ViewTodayAddedDocsComponent', () => {
  let component: ViewTodayAddedDocsComponent;
  let fixture: ComponentFixture<ViewTodayAddedDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodayAddedDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodayAddedDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
