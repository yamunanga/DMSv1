import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSetPassComponent } from './model-set-pass.component';

describe('ModelSetPassComponent', () => {
  let component: ModelSetPassComponent;
  let fixture: ComponentFixture<ModelSetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelSetPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
