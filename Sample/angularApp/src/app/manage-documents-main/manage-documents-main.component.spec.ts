import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDocumentsMainComponent } from './manage-documents-main.component';

describe('ManageDocumentsMainComponent', () => {
  let component: ManageDocumentsMainComponent;
  let fixture: ComponentFixture<ManageDocumentsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDocumentsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDocumentsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
