import { SettingsProvider } from './../../providers/settings/settings';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatiPage } from './dati';
import { IonicImageViewerModule } from 'ionic-img-viewer';



@NgModule({
  declarations: [
    DatiPage,
  ],
  imports: [
    IonicPageModule.forChild(DatiPage),
    IonicImageViewerModule
  ],
  providers:[
    SettingsProvider
  ]
})
export class DatiPageModule {}
