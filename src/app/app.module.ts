import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from '@pages/login/login.component';
import { httpInterceptorProviders } from '@core/helpers/interceptors';
import { TeamComponent } from './pages/team/team.component';
import { HeaderComponent } from './core/components/header/header.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { PrimaryDirective } from './shared/directives/primary.directive';
import { SecondaryDirective } from './shared/directives/secondary.directive';
import { LargeDirective } from './shared/directives/large.directive';
import { FullWidthDirective } from './shared/directives/full-width.directive';
import { CapsDirective } from './shared/directives/caps.directive';
import { SmallDirective } from './shared/directives/small.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeamComponent,
    HeaderComponent,
    ButtonComponent,
    PrimaryDirective,
    SecondaryDirective,
    LargeDirective,
    FullWidthDirective,
    CapsDirective,
    SmallDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
