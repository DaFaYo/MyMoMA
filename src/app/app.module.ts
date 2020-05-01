import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterObjectsComponent } from './filter-objects/filter-objects.component';
import { DisplayObjectsComponent } from './display-objects/display-objects.component';
import { DisplayObjectComponent } from './display-object/display-object.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FilterObjectsComponent,
    DisplayObjectsComponent,
    DisplayObjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
