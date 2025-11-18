import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
email:string='';
password:string='';

constructor(private authService:AuthService,private router:Router){}
  register (){
    this.authService.register(this.email,this.password)
    .then(res=>{
      console.log('User registered',res.user);
      this.router.navigate(['/contact']);
      
    })
    .catch(err=>{
      console.error(err);
      this.router.navigate(['/error']);
    });
  }
}

