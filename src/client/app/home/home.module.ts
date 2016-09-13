import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { NameListService } from '../shared/name-list/index';
import {PolymerModule} from './home.polymerimports';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [HomeComponent, PolymerModule.forComponent()],
  exports: [HomeComponent],
  providers: [NameListService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
