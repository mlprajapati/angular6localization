import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {APP_BASE_HREF} from '@angular/common';
import {TestsModule} from './shared/tests.module';
import {TranslateModule} from '@ngx-translate/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {APP_CONFIG, AppConfig} from './config/app.config';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { UserService } from './pages/user-management/user.service';
import { Error404Component } from './core/components/error404/error404.component';

describe('AppComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TestsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        AppComponent,
        UserManagementComponent,
        Error404Component
      ],
      providers: [
        {provide: APP_CONFIG, useValue: AppConfig},
        {provide: APP_BASE_HREF, useValue: '/'},
        UserService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the app', (() => {
    expect(component).toBeTruthy();
  }));

  it('should change title meta tag in root path', async(() => {
    fixture.detectChanges();
    expect(component.title.getTitle()).toBe('Angular Example App');
  }));

  it('should check browser features', (() => {
    expect(component.checkBrowserFeatures()).toBeTruthy();
  }));
});