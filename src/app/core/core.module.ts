import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {throwIfAlreadyLoaded} from './module-import-guard';
import {LoggerService} from './services/logger.service';
import {NavComponent} from './components/nav/nav.component';
import {FooterComponent} from './components/footer/footer.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {SearchBarComponent} from './components/search-bar/search-bar.component';
import {Error404Component} from './components/error404/error404.component';
import {ProgressBarService} from './services/progress-bar.service';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationComponent } from './directives/notification/notification.directive';
import { NotificationService } from './directives/notification/notification.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    SideNavComponent,
    HeaderComponent,
    NotificationComponent
  ],
  declarations: [
    NavComponent,
    FooterComponent,
    SearchBarComponent,
    Error404Component,
    SideNavComponent,
    HeaderComponent,
    NotificationComponent
  ],
  providers: [
    LoggerService,
    ProgressBarService,
    NotificationService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}