import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentIndexComponent } from './moment-index.component';

describe('MomentIndexComponent', () => {
  let component: MomentIndexComponent;
  let fixture: ComponentFixture<MomentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MomentIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
