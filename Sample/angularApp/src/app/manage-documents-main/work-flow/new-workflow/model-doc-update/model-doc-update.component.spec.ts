import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDocUpdateComponent } from './model-doc-update.component';

describe('ModelDocUpdateComponent', () => {
  let component: ModelDocUpdateComponent;
  let fixture: ComponentFixture<ModelDocUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelDocUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDocUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
