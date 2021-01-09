import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUserprofileComponent } from './popup-userprofile.component';

describe('PopupUserprofileComponent', () => {
  let component: PopupUserprofileComponent;
  let fixture: ComponentFixture<PopupUserprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupUserprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUserprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
