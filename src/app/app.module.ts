import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ChomepageComponent } from './chomepage/chomepage.component';
import { CloginComponent } from './clogin/clogin.component';
import { CregisterComponent } from './cregister/cregister.component';
import { CfooterComponent } from './cfooter/cfooter.component';
import { CheaderComponent } from './cheader/cheader.component';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

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
    FormsModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"alerta-bogota-b4d27","appId":"1:422737468506:web:87168c884f78248ae04c63","storageBucket":"alerta-bogota-b4d27.firebasestorage.app","apiKey":"AIzaSyCT4DqqI7iNUU7pePh0XY58FV6kqcDcDhc","authDomain":"alerta-bogota-b4d27.firebaseapp.com","messagingSenderId":"422737468506"})),
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }