import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdedUsersComponent } from './view-aded-users.component';

describe('ViewAdedUsersComponent', () => {
  let component: ViewAdedUsersComponent;
  let fixture: ComponentFixture<ViewAdedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdedUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAdedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
