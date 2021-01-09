import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSentsComponent } from './view-sents.component';

describe('ViewSentsComponent', () => {
  let component: ViewSentsComponent;
  let fixture: ComponentFixture<ViewSentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
