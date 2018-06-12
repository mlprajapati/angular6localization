import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {APP_CONFIG, AppConfig} from '../../../config/app.config';
import {MaterialModule} from '../../../shared/material.module';
import {TestsModule} from '../../../shared/tests.module';
import { HeaderComponent } from './header.component';
import { NavService } from '../../services/nav.service';

describe('SideNavComponent', () => {
  let fixture;
  let component;
 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
        MaterialModule
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should create nav component with constructor', (() => {
    const translateService = TestBed.get(TranslateService);
    const navService = new NavService();
    const instance = new HeaderComponent(AppConfig, translateService,navService);
    expect(instance).toBeTruthy();
  }));

  it('should create nav component', (() => {
    expect(component).toBeTruthy();
  }));

  it('should update progress bar', (() => {
    expect(component.progressBarMode).toBeUndefined();
    expect(component.progressBarMode).toBe('query');
  }));

  it('should change language to spanish', (() => {
    expect(component.translateService.currentLang).toBeUndefined();
    component.changeLanguage('es');
    expect(component.translateService.currentLang).toBe('es');
  }));
});