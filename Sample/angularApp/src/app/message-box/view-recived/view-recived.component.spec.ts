import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecivedComponent } from './view-recived.component';

describe('ViewRecivedComponent', () => {
  let component: ViewRecivedComponent;
  let fixture: ComponentFixture<ViewRecivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRecivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
