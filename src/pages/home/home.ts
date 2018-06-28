import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {DatiPage} from "../dati/dati";
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SettingsProvider } from './../../providers/settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  articles: any;
  api: string = "";//INSERT YOU API HERE
  prova;
  source=[];
  selectedSource: String="ansa";
  selectedTheme: String;
  open;

  constructor(public navCtrl: NavController,public http: Http,public modalCtrl: ModalController,public loadingCtrl: LoadingController,public alertCtrl: AlertController, private settings: SettingsProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    this.loadSource();
  }

  toggleAppTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }

ionViewDidLoad(){
 this.loadData();
}

  loadSource(){
    this.http.get('https://newsapi.org/v2/sources?apiKey='+this.api).map(res => res.json()).subscribe(
      data => {
        this.source = data.sources;
        console.log(this.source[0].id);
      }, err => {
          console.log("Oops!");
      }
  );
  }

  loadData(){
    const loader = this.loadingCtrl.create({
      content: "Loading News..."
    });
    loader.present();
    this.http.get('https://newsapi.org/v2/top-headlines?sources='+this.selectedSource+'&apiKey='+this.api).map(res => res.json()).subscribe(
      data => {
        this.articles = data.articles;
        loader.dismiss();
      }, err => {
        loader.dismiss();
          console.log("Oops!");
      }
  );
  }

  openModal(event){ 
    const modal = this.modalCtrl.create("DatiPage", {dati : event});
    modal.present();
  }

  chooseSource(source){
    this.selectedSource = source;
    this.loadData();
  }

  

 

}
