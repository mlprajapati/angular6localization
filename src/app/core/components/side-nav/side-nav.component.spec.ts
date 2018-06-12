import {async, TestBed} from '@angular/core/testing';
import {SideNavComponent} from './side-nav.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../../config/app.config';
import {UserService} from '../../../pages/user-management/user.service';
import {MaterialModule} from '../../../shared/material.module';
import {ProgressBarService} from '../../services/progress-bar.service';
import {TestsModule} from '../../../shared/tests.module';
import { NavService } from '../../services/nav.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('SideNavComponent', () => {
  let fixture;
  let component;
  let progressBarService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        MaterialModule
      ],
      declarations: [
        SideNavComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        UserService,
        ProgressBarService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
    progressBarService = TestBed.get(ProgressBarService);
  }));

  it('should create nav component with constructor', (() => {
    const translateService = TestBed.get(TranslateService);
    const navService = new NavService();
    const activatedRoute = new ActivatedRoute();
    const router: Router =null;
    const instance = new SideNavComponent(AppConfig, progressBarService, translateService,navService,activatedRoute,router);
    expect(instance).toBeTruthy();
  }));

  it('should create nav component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should update progress bar', (() => {
    expect(component.progressBarMode).toBeUndefined();
    progressBarService.updateProgressBar$.emit('query');
    expect(component.progressBarMode).toBe('query');
  }));

  it('should change language to spanish', (() => {
    expect(component.translateService.currentLang).toBeUndefined();
    component.changeLanguage('es');
    expect(component.translateService.currentLang).toBe('es');
  }));
});