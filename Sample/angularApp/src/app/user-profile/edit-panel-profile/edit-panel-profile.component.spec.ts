import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPanelProfileComponent } from './edit-panel-profile.component';

describe('EditPanelProfileComponent', () => {
  let component: EditPanelProfileComponent;
  let fixture: ComponentFixture<EditPanelProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPanelProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPanelProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
