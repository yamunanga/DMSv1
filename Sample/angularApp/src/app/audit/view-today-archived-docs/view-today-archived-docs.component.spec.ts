import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodayArchivedDocsComponent } from './view-today-archived-docs.component';

describe('ViewTodayArchivedDocsComponent', () => {
  let component: ViewTodayArchivedDocsComponent;
  let fixture: ComponentFixture<ViewTodayArchivedDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodayArchivedDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodayArchivedDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
