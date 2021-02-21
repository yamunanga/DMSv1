import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageApprovementComponent } from './manage-approvement.component';

describe('ManageApprovementComponent', () => {
  let component: ManageApprovementComponent;
  let fixture: ComponentFixture<ManageApprovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageApprovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageApprovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
