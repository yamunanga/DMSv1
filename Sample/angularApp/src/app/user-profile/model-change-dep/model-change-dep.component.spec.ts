import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelChangeDepComponent } from './model-change-dep.component';

describe('ModelChangeDepComponent', () => {
  let component: ModelChangeDepComponent;
  let fixture: ComponentFixture<ModelChangeDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelChangeDepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelChangeDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
