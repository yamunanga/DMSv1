import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelViewListComponent } from './model-view-list.component';

describe('ModelViewListComponent', () => {
  let component: ModelViewListComponent;
  let fixture: ComponentFixture<ModelViewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelViewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
