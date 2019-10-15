import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CutInManagerComponent } from './cut-in-manager.component';

describe('CutInManagerComponent', () => {
  let component: CutInManagerComponent;
  let fixture: ComponentFixture<CutInManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CutInManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CutInManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
