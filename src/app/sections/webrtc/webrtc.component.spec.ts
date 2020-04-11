import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebrtcComponent } from './webrtc.component';

describe('WebrtcComponent', () => {
  let component: WebrtcComponent;
  let fixture: ComponentFixture<WebrtcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebrtcComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebrtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
