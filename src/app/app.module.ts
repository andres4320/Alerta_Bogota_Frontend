import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChomepageComponent } from './chomepage/chomepage.component';
import { CloginComponent } from './clogin/clogin.component';
import { CregisterComponent } from './cregister/cregister.component';
import { CfooterComponent } from './cfooter/cfooter.component';
import { CheaderComponent } from './cheader/cheader.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    ChomepageComponent,
    CloginComponent,
    CregisterComponent,
    CfooterComponent,
    CheaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
