import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = fb.group({
      email: ["", [Validators.required]],
      passwd: ["", [Validators.required]]
    });
   }

  ngOnInit() {
    // this.onRegisterSubmit();
  }

  onRegisterSubmit(){
    var previousRegister = JSON.parse(localStorage.getItem('registers')) || [];
    var count = previousRegister.length;
    // console.log(count); 

    if(count < 1)
    {
      var id = 1;
      console.log('if');
    }else{
      var id = ++count;
      console.log('else');
    }

    var registerData = {
      "id": id,
      "email": this.registerForm.value.email,
      "password": this.registerForm.value.passwd
    };


    previousRegister.push(registerData);

    localStorage.setItem("registers", JSON.stringify(previousRegister));
    console.log(previousRegister);

    this.registerForm.reset();

    this.router.navigate(['/login']);
  }

}
