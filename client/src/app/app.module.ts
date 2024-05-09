import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ListsModule } from './modules/lists/lists.module';
import { SharedModule } from './modules/shared/shared.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HistoryModule } from './modules/history/history.module';
import { CoreModule } from './modules/core/core.module';
import { LoadingInterceptor } from './modules/core/interceptors/loading.interceptor';
import { ErrorInterceptor } from './modules/core/interceptors/error.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalsModule } from './modules/modals/modals.module';
import { BoardsModule } from './modules/boards/boards.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './modules/home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule,
    SharedModule,
    ModalsModule,
    CoreModule,
    ListsModule,
    HistoryModule,
    BoardsModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
