import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldWorkflowComponent } from './old-workflow.component';

describe('OldWorkflowComponent', () => {
  let component: OldWorkflowComponent;
  let fixture: ComponentFixture<OldWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldWorkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OldWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
