import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreIndexComponent } from './core-index.component';

describe('CoreIndexComponent', () => {
  let component: CoreIndexComponent;
  let fixture: ComponentFixture<CoreIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoreIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
