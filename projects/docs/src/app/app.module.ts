import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from "./pages/home/home.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TooltipComponent} from './pages/components/tooltip/tooltip.component';
import {TooltipModule} from "projects/tooltip/src/public-api";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TooltipModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
