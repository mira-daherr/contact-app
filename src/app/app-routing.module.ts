import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { ErrorComponent } from './error/error/error.component';
import { ContactComponent } from './contact/contact.component';

// const routes: Routes = [
//   { path: 'auth/register', component: RegisterComponent },
//   { path: 'auth/login', component: LoginComponent },
//   { path: 'error', component: ErrorComponent },
//   { path: 'contact', component: ContactComponent },
//   { path: '', redirectTo: 'auth/register', pathMatch: 'full' } // default route
// ];
const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
  { path: '', redirectTo: 'auth/register', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
