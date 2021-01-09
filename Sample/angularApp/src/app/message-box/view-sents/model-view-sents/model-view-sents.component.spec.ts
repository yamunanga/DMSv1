import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelViewSentsComponent } from './model-view-sents.component';

describe('ModelViewSentsComponent', () => {
  let component: ModelViewSentsComponent;
  let fixture: ComponentFixture<ModelViewSentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelViewSentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelViewSentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
