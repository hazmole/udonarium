import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutInViewComponent } from './cut-in-view.component';

describe('CutInViewComponent', () => {
  let component: CutInViewComponent;
  let fixture: ComponentFixture<CutInViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutInViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutInViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
