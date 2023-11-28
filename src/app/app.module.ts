import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
//<mat-icon>dashboard</mat-icon>
//<mat-icon>delete</mat-icon>
//<mat-icon> insert_drive_file</mat-icon>
//<mat-icon> category</mat-icon>
//<mat-icon>supervised_user_circle</mat-icon>
