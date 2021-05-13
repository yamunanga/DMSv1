import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameModelComponent } from './rename-model.component';

describe('RenameModelComponent', () => {
  let component: RenameModelComponent;
  let fixture: ComponentFixture<RenameModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenameModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
