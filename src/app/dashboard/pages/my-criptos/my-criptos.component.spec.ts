import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCriptosComponent } from './my-criptos.component';

describe('MyCriptosComponent', () => {
  let component: MyCriptosComponent;
  let fixture: ComponentFixture<MyCriptosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCriptosComponent]
    });
    fixture = TestBed.createComponent(MyCriptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
