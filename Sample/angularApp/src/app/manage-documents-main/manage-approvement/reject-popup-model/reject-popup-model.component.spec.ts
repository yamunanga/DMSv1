import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectPopupModelComponent } from './reject-popup-model.component';

describe('RejectPopupModelComponent', () => {
  let component: RejectPopupModelComponent;
  let fixture: ComponentFixture<RejectPopupModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectPopupModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectPopupModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
