import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrSendDataComponent } from './qr-send-data.component';

describe('QrSendDataComponent', () => {
  let component: QrSendDataComponent;
  let fixture: ComponentFixture<QrSendDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrSendDataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrSendDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
