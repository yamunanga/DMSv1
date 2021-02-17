import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatOnlyComponent } from './sub-cat-only.component';

describe('SubCatOnlyComponent', () => {
  let component: SubCatOnlyComponent;
  let fixture: ComponentFixture<SubCatOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubCatOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
