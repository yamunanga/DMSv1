import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedDocsComponent } from './archived-docs.component';

describe('ArchivedDocsComponent', () => {
  let component: ArchivedDocsComponent;
  let fixture: ComponentFixture<ArchivedDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
