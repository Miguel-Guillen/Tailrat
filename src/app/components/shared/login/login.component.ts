import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  forms: FormGroup;
  formValid = true;
  users: Array<any> = [];
  logIn: any;

  constructor(private formB: FormBuilder, private router: Router) {
    this.forms = this.createForm();
  }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem('accounts')) || [];
    this.logIn = JSON.parse(localStorage.getItem('logged')) || {};
  }

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

  login(data: any){
    this.formValid = true;
    for(const user of this.users){
      if(data.email == user.email && data.password == user.password){
        const logged = {
          id: user.id,
          email: user.email,
          token: '*24@e78_!b2d'
        }
        localStorage.setItem('logged', JSON.stringify(logged));
        this.reset();
        this.router.navigate(['/inventory']);
      }
    }
    this.formValid = false;
    // this.toast.error('Ha ocurrido un error al registrar', ``,
    // { positionClass: 'toast-bottom-right'});
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