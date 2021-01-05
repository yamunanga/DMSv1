import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeRoleComponent } from './modal-change-role.component';

describe('ModalChangeRoleComponent', () => {
  let component: ModalChangeRoleComponent;
  let fixture: ComponentFixture<ModalChangeRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalChangeRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
