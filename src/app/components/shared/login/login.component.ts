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

  login(data: any){
    this.formValid = true;
    if(data.email == 'admin@gmail.com' && data.password == '12345678'){
      this.router.navigate(['/inventory']);
    }else {
      this.formValid = false;
      console.log(data);
    }
  }

  get mail(){
    return this.forms.get('email');
  }

  get pass(){
    return this.forms.get('password');
  }

}