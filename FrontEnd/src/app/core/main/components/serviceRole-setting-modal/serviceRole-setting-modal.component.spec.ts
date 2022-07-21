import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRoleSettingModalComponent } from './serviceRole-setting-modal.component';

describe('ShowModalComponent', () => {
  let component: ServiceRoleSettingModalComponent;
  let fixture: ComponentFixture<ServiceRoleSettingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceRoleSettingModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceRoleSettingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
