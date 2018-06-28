# News-Api-Ionic
This is an Hybrid app made with Ionic Framework working with the api made by: https://newsapi.org/. This app is a simple News reader 
working with thousands of sources. You can choose from which source pick the news.

The UI is very simple and , i think, cool. </br>
<img src="https://github.com/cavazzatommaso/News-Api-Ionic/blob/master/ezgif.com-optimize.gif">

## How it works?
Thanks to the https://newsapi.org/ API we can bringh a list of source. To make so we do this:

```dart
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
  //The result should be a list of sources
```

After the sources has been loaded we can load the news from one source. Here is the function:

```dart
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
```
now we have everything we need, so let's create a modal component and pass the single news clicked.

```dart
openModal(event){ 
    const modal = this.modalCtrl.create("DatiPage", {dati : event});
    modal.present();
  }
```
  
  To create the select we have to make this For thanks to Angular Directive:
  
```dart
  <ion-item padding-right class="source" color="danger">
        <ion-label>Source:</ion-label>
        <ion-select name="selected" [(ngModel)]="selectedSource" (ionChange)="loadData()" interface="action-sheet" submitText="Okay" cancelText="Nah">
        <ion-option *ngFor="let item of source"  value="{{item.id}}">{{item.name}}</ion-option>
        </ion-select>
    </ion-item>
 ```
    
Now we have finish the loading procedure and we have only to display the data in the other modal.
    
## How to use this?
To make this work on your computer:
* git clone https://github.com/cavazzatommaso/News-Api-Ionic.git
* cd News-Api-Ionic
* change the api Key on home.ts
* ionic lab

## THANKS AGAIN TO THE API https://newsapi.org/ THIS APP IS ONLY DISPLAYING IS DATA
