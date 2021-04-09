import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelViewOldListComponent } from './model-view-old-list.component';

describe('ModelViewOldListComponent', () => {
  let component: ModelViewOldListComponent;
  let fixture: ComponentFixture<ModelViewOldListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelViewOldListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelViewOldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
