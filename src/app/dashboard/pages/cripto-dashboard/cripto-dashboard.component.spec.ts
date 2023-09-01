import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriptoDashboardComponent } from './cripto-dashboard.component';

describe('CriptoDashboardComponent', () => {
  let component: CriptoDashboardComponent;
  let fixture: ComponentFixture<CriptoDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CriptoDashboardComponent]
    });
    fixture = TestBed.createComponent(CriptoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
