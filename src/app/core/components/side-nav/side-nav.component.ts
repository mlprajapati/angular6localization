import {Component, Inject, OnInit, ViewChild, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {APP_CONFIG, AppConfig} from '../../../config/app.config';
import {IAppConfig} from '../../../config/iapp.config';
import {ProgressBarService} from '../../services/progress-bar.service';
import { NavService } from '../../services/nav.service';
import { MatSidenav } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})

export class SideNavComponent implements OnInit {
  @Input () mode;
  @Input () isOpened;
  appConfig: any;
  menuItems: any[];
  progressBarMode: string;
  currentLang: string;
  sidenavState: any = false;
  constructor(@Inject(APP_CONFIG) appConfig: IAppConfig,
              private progressBarService: ProgressBarService,
              private translateService: TranslateService,
              private navService: NavService,private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.appConfig = appConfig;
  }

  ngOnInit() {
    this.currentLang = this.translateService.currentLang;
    this.loadMenus();
    this.progressBarService.updateProgressBar$.subscribe((mode: string) => {
      this.progressBarMode = mode;
    });
    this.navService.getSideNavState().subscribe((item)=>{
      this.sidenavState = (this.isOpened)?item:!item;
    });
    if(this.isOpened){
      this.sidenavState=true;
    } 
    


  }

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      this.loadMenus();
    });
  }

  private loadMenus(): void {
    this.translateService.get(['general'], {}).subscribe((texts: any) => {
      console.log("--->",texts);
      this.menuItems = [
        {link: '/'+AppConfig.routes.login, name: texts['general'].menu['login'],icon:'input'},
        {link: '/'+AppConfig.routes.newusers, name: texts['general'].menu['createuser'],icon:'person_add'},
        {link: '/' + AppConfig.routes.users, name: texts['general'].menu['users'],icon:'account_box'},
        {link: '/' + AppConfig.routes.dashboard, name: texts['general'].menu['dashboard'],icon:'dashboard'}
      ];
    });
  }
  goToPage(pagename){
    console.log("pagename ",pagename);
      this.navService.setCurrentNavItem(pagename);
      this.router.navigateByUrl('/'+pagename);
    }
}