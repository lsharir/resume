import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { FILTERS } from './filters';
import { SERVICES } from './services';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...FILTERS
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ...SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
