import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListsModule } from './modules/lists/lists.module';
import { SharedModule } from './shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HistoryModule } from './modules/history/history.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ListsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    BsDropdownModule,
    HistoryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
