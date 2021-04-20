import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodayAutoArchivedDocsComponent } from './view-today-auto-archived-docs.component';

describe('ViewTodayAutoArchivedDocsComponent', () => {
  let component: ViewTodayAutoArchivedDocsComponent;
  let fixture: ComponentFixture<ViewTodayAutoArchivedDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodayAutoArchivedDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodayAutoArchivedDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
