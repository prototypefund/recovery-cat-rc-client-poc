import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportingSchedulesSectionComponent } from './reporting-schedules-section.component';

describe('ReportingSchedulesSectionComponent', () => {
  let component: ReportingSchedulesSectionComponent;
  let fixture: ComponentFixture<ReportingSchedulesSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingSchedulesSectionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportingSchedulesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
