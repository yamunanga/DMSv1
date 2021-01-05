import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelForOtherUserRoleComponent } from './model-for-other-user-role.component';

describe('ModelForOtherUserRoleComponent', () => {
  let component: ModelForOtherUserRoleComponent;
  let fixture: ComponentFixture<ModelForOtherUserRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelForOtherUserRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelForOtherUserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
