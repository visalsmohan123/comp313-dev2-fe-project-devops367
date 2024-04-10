import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyDonateComponent } from './whydonate.component';

describe('WhyDonateComponent', () => {
  let component: WhyDonateComponent;
  let fixture: ComponentFixture<WhyDonateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyDonateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyDonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
