import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { LoginComponent } from './login.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from '../../../app-routing.module';
import { environment } from 'src/environments/environment';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule,
        FormsModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        IonicStorageModule.forRoot(),
        AppRoutingModule
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Credenciales invalidas', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    component.mail.setValue('prueba@gmail.com');
    component.pass.setValue('92347678');

    const btnLogin = fixture.debugElement.query(By.css('#logIn'));
    btnLogin.nativeElement.click();
    expect(component.formValid).toBeTruthy(false);
  });

  it('Credenciales correctas', () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    component.mail.setValue('191317@utags.edu.mx');
    component.pass.setValue('12345678');

    const btnLogin = fixture.debugElement.query(By.css('#logIn'));
    btnLogin.nativeElement.click();
    expect(component.formValid).toBeTruthy(true);
  });
});
