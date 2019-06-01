import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductserviceService } from 'src/app/productservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  public logindata:any;
  public registerCredentials = [];
  public filterData:any = [];
  public loginbol = false;
  // public loginMatch:any = [];

  constructor(private fb: FormBuilder, 
    private productService: ProductserviceService,
    private router: Router) { 
    this.loginForm = fb.group({
      email: ['', [Validators.required]],
      passwd: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.registerCredentials = this.productService.fetchRegister();
    console.log('registerCredentials', this.registerCredentials);
    // console.log(this.onLoginSubmit();
  }

  onLoginSubmit(){    
    // console.log('loginForm',this.loginForm.value.passwd);
    var loginData = {
      'email': this.loginForm.value.email,
      'passwd': this.loginForm.value.passwd
    }

    
    for(var i=0; i<this.registerCredentials.length; i++)
    {
      if(this.loginForm.value.email == this.registerCredentials[i].email && this.loginForm.value.passwd == this.registerCredentials[i].password)
      {
        console.log(this.registerCredentials[i].id);
        loginAuthenticate(this.registerCredentials[i].id)
        // this.router.navigate(['']);
      }
        // alert("login id and pass doesn't match");
      
    }

    function loginAuthenticate(id){
      var previousdata = JSON.parse(localStorage.getItem('registers'));
      
      var filterdata = previousdata.filter(regid => regid.id == id)
      
      console.log(filterdata);
      // console.log('previousdata',previousdata)
      
      //session storage
      var previoussession = JSON.parse(sessionStorage.getItem('login')) || [];
      var count = previoussession.length;

      if(count < 1)
      {
       var id:any = 1;
      }else{
        var id:any = ++count
      }

      var filterlogindata = {
        'id': id,
        'email': filterdata[0].email,
        'password': filterdata[0].password
      }

      console.log('filterlogindata',filterlogindata)

      previoussession.push(filterlogindata)

      sessionStorage.setItem("login", JSON.stringify(previoussession));
      console.log(sessionStorage.getItem('login'));
    }
    this.loginForm.reset();

    if(!loginAuthenticate){
      alert('login is not successfull');
    }
    else{
      this.router.navigate(['']);
    }
  }

  

}
