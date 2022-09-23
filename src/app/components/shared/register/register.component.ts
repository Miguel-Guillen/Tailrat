import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  forms: FormGroup;
  formValid = true;

  constructor(private formB: FormBuilder, private router: Router) {
    this.forms = this.createForm();
  }

  ngOnInit() {}

  createForm(): FormGroup {
    return this.forms = this.formB.group({
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
    if(this.forms.valid === true){
      const users = JSON.parse(localStorage.getItem('accounts')) || [];
      const date = new Date();
      let user = {
        id: date.getDay() + '' + date.getFullYear() + users.length,
        email: data.email,
        password: data.password
      }
      users.push(user);
      localStorage.setItem('accounts', JSON.stringify(users));
      // this.toast.success('Registro completado correctamente', ``,
      // { positionClass: 'toast-bottom-right'});
      this.router.navigate(['/login']);
      this.forms.reset();
    }else {
      // this.toast.error('Ha ocurrido un error al registrar', ``,
      // { positionClass: 'toast-bottom-right'});
    }
  }

  get mail(){
    return this.forms.get('email');
  }

  get pass(){
    return this.forms.get('password');
  }
}
