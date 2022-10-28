import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserService } from 'src/app/core/service/user.service';
import { AlertController } from '@ionic/angular';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  forms: FormGroup;
  formValid = true;
  users: Array<any> = [];

  constructor(private formB: FormBuilder, private router: Router,
    private _authService: AuthService, private _userService: UserService,
    private alertController: AlertController) {
    this.forms = this.createForm();
  }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('accounts')) || [];
  }

  createForm(): FormGroup {
    return this.forms = this.formB.group({
      email: ['', [
        // Validators.required, 
        Validators.pattern("^[a-zA-Z0-9._%+-/ñ]+@[a-z0-9.-]+\\.[a-z]{2,6}$")
      ]],
      password: ['', [
        // Validators.required,
        Validators.minLength(8)
      ]]
    })
  }

  login(data: any){
    this.formValid = true;
    if(this.forms.valid === true){
      this._authService.loginWithEmailAndPass(data.email, data.password).then((res: any) => {
        if(res.uid){
          this._authService.searchUser(data.email).pipe(take(1)).subscribe((data: any) => {
            if(data.length > 0){
              const user = {
                id: data[0].payload.doc.id,
                nombre: data[0].payload.doc.data()['nombres'],
                email: data[0].payload.doc.data()['email'],
                plan: data[0].payload.doc.data()['plan'],
                level: data[0].payload.doc.data()['privilegios'],
                uid: res.uid
              }
              
              this._authService.login(user);
              this.reset();
              this.router.navigate(['/dashboard']);
            }else {
              this._authService.logout();
              this.formValid = false;
              this.presentAlert();
            }
          })
        }else {
          this._authService.logout();
          this.formValid = false;
          this.presentAlert();
        }
      })
    }
    this.formValid = false;
  }

  loginG(){
    this.formValid = true;
    try {
      this._authService.loginWithGoogle().then((res: any) => {
        if(res.user.uid){
          this._userService.getByUID(res.user.uid).subscribe((response: any) => {
            if(response.length > 0){
              const data = {
                id: response[0].payload.doc.id,
                ... response[0].payload.doc.data()
              };
              const user = {
                id: data.id,
                nombre: res.user.displayName,
                email: res.user.email,
                plan: data.plan,
                level: data.privilegios,
                uid: res.user.uid
              }
              this._authService.login(user);
              this.reset();
              this.router.navigate(['/dashboard']);
            }else {
              this._authService.logout();
              this.formValid = false;
              this.presentAlert();
            }
          })
        }else {
          this._authService.logout();
          this.formValid = false;
          this.presentAlert();
        }
      })
    } catch (error) {
      this.errorAlert();
      console.log(error);
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error al iniciar sesion',
      message: 'No se encuentraron cuentas registradas',
      cssClass: 'colors',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Error al iniciar sesion',
      message: 'Ha ocurrido un error al iniciar sesion, intente de nuevo',
      cssClass: 'colors',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  get mail(){
    return this.forms.get('email');
  }

  get pass(){
    return this.forms.get('password');
  }

  reset(){
    this.forms.reset();
    this.formValid = true;
  }
}