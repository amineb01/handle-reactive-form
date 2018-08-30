import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CustomFormsModule } from 'ngx-custom-validators';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgMultiSelectDropDownModule,
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule  ,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
