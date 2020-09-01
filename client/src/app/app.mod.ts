import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';
import { UilibModule } from './uilib/uilib.mod'

import { AppComponent } from './app';

import { SidemenuComponent } from './layout/sidemenu/sidemenu';
import { SidebarTopComponent } from './layout/sidemenu/top/top';
import { SidebarBottomComponent } from './layout/sidemenu/bottom/bottom';
import { CommonModule } from '@angular/common';
import { SideMenuService } from './core/services/sidemenu';

@NgModule({
  declarations: [
    AppComponent,

    SidemenuComponent,
    SidebarTopComponent,
    SidebarBottomComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    UilibModule,
    
  ],
  providers: [
    SideMenuService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
