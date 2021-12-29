import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule } from '../../../anglify/src/modules/text-field/text-field.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, TextFieldModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
