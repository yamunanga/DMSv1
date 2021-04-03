import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSentMsgComponent } from './model-sent-msg.component';

describe('ModelSentMsgComponent', () => {
  let component: ModelSentMsgComponent;
  let fixture: ComponentFixture<ModelSentMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelSentMsgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSentMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
