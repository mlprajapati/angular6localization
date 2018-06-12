import {Component, Inject, OnInit, Output, EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {APP_CONFIG, AppConfig} from '../../../config/app.config';
import {IAppConfig} from '../../../config/iapp.config';
import {ProgressBarService} from '../../services/progress-bar.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'header-nav',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  appConfig: any;
  currentLang: string;
  sideNav: Boolean = false;

  constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
              private translateService: TranslateService,private navService:NavService) {
    this.appConfig = appConfig;
  }

  ngOnInit() {
    this.currentLang = this.translateService.currentLang;
    this.loadLocalization();
  }
  setSideNavState() {
   
    this.navService.setSideNavState(this.sideNav);
    this.sideNav = !this.sideNav;
  }

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      this.loadLocalization();
    });
  }

  private loadLocalization(): void {
    this.translateService.get(['general'], {}).subscribe((texts: any) => {
      console.log("--->",texts);
    });
  }
 
}