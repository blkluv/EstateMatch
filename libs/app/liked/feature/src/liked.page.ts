import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { ILikeProperty } from '@estate-match/api/properties/util';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'ms-liked-page',
  templateUrl: './liked.page.html',
  styleUrls: ['./liked.page.scss'],
  providers: [TranslateService]
})
export class LikedPage {
  constructor(private http: HttpClient,
    private toastController: ToastController,
    private translate: TranslateService) {
      this.translate.setDefaultLang(sessionStorage.getItem('languagePref') || 'en');
     }

  likedProperties: ILikeProperty[] = [];
  async ngOnInit() {
    const url = 'api/getLikedProperties';
    const body = {
      user: sessionStorage.getItem('username'),
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.likedProperties = await this.http.post(url, body, { headers }).toPromise() as ILikeProperty[];
  }
  async makeToast(message: any){
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    })
    toast.present();
  }
}