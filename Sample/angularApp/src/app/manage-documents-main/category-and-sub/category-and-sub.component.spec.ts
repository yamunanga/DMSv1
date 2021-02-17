import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAndSubComponent } from './category-and-sub.component';

describe('CategoryAndSubComponent', () => {
  let component: CategoryAndSubComponent;
  let fixture: ComponentFixture<CategoryAndSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryAndSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAndSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
