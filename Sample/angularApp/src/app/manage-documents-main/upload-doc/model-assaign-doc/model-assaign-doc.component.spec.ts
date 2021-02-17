import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAssaignDocComponent } from './model-assaign-doc.component';

describe('ModelAssaignDocComponent', () => {
  let component: ModelAssaignDocComponent;
  let fixture: ComponentFixture<ModelAssaignDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelAssaignDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAssaignDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
