import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelUnlockComponent } from './model-unlock.component';

describe('ModelUnlockComponent', () => {
  let component: ModelUnlockComponent;
  let fixture: ComponentFixture<ModelUnlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelUnlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelUnlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
