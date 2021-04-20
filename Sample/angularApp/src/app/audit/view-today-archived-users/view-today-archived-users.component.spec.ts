import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodayArchivedUsersComponent } from './view-today-archived-users.component';

describe('ViewTodayArchivedUsersComponent', () => {
  let component: ViewTodayArchivedUsersComponent;
  let fixture: ComponentFixture<ViewTodayArchivedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodayArchivedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodayArchivedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
