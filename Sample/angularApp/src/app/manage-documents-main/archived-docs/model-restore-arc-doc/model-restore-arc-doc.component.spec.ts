import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRestoreArcDocComponent } from './model-restore-arc-doc.component';

describe('ModelRestoreArcDocComponent', () => {
  let component: ModelRestoreArcDocComponent;
  let fixture: ComponentFixture<ModelRestoreArcDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelRestoreArcDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelRestoreArcDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
