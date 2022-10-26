import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  forms: FormGroup;
  formValid = true;

  constructor(private formB: FormBuilder, private router: Router,
    private _authService: AuthService, private alertController: AlertController) {
    this.forms = this.createForm();
  }

  ngOnInit() {}

  createForm(): FormGroup {
    return this.forms = this.formB.group({
      names: ['', [
        Validators.required, 
      ]],
      lastnames: ['', [
        Validators.required, 
      ]],
      email: ['', [
        Validators.required, 
        Validators.pattern("^[a-zA-Z0-9._%+-/ñ]+@[a-z0-9.-]+\\.[a-z]{2,6}$")
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    })
  }

  register(data: any){
    this.formValid = true;
    if(this.forms.valid === true){
      const { email, password } = data;
      let user = {
        nombres: data.names,
        apellidos: data.lastnames,
        email: email,
        plan: '',
        privilegios: 'usuario'
      }

      this._authService.registerWithEmailAndPass(email, password, user).then(() => {
        this.alert()
        this.forms.reset();
        this.router.navigate(['/login']);
      });
    }else {
      this.formValid = false;
      this.errorAlert();
    }
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Usuario registrado',
      message: 'El usuario ha sido registrado exitosamente',
      cssClass: 'register-colors',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Datos incorrectos',
      message: 'Datos incorrectos o faltantes',
      cssClass: 'colors',
      buttons: ['Aceptar'],
    });
    await alert.present();
  }



  get name(){
    return this.forms.get('names');
  }

  get lastname(){
    return this.forms.get('lastnames');
  }

  get mail(){
    return this.forms.get('email');
  }

  get pass(){
    return this.forms.get('password');
  }
}
