import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
email:string='';
password:string='';
constructor(private authService:AuthService,private router:Router){}

login(){
  this.authService.login(this.email,this.password)
  .then(res=>{
    console.log('User logged in',res.user);
    this.router.navigate(['/contact']);
  })
  .catch(err=>{
    console.error(err);
    this.router.navigate(['/error']);
  });
}
}
