import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule } from '../../../anglify/src/modules/text-field/text-field.module';
import { FormsModule } from '@angular/forms';
import { TextFieldPageComponent } from './pages/component-pages/text-field-page/text-field-page.component';
import { IconPageComponent } from './pages/component-pages/icon-page/icon-page.component';
import { IconModule } from '../../../anglify/src/modules/icon/icon.module';
import { StylingTableComponent } from './components/styling-table/styling-table.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HomeComponent, TextFieldPageComponent, IconPageComponent, StylingTableComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, TextFieldModule, FormsModule, IconModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
