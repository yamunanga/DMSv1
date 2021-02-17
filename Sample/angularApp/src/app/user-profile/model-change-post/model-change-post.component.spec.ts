import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelChangePostComponent } from './model-change-post.component';

describe('ModelChangePostComponent', () => {
  let component: ModelChangePostComponent;
  let fixture: ComponentFixture<ModelChangePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelChangePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelChangePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
