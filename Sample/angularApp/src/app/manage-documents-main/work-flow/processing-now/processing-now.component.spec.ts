import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingNowComponent } from './processing-now.component';

describe('ProcessingNowComponent', () => {
  let component: ProcessingNowComponent;
  let fixture: ComponentFixture<ProcessingNowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessingNowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
