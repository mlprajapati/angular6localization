import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LanguageService {

  private language = new BehaviorSubject('en');
  currentLanguage = this.language.asObservable();

  constructor() { }

  changeMessage(lang: string) {
    this.language.next(lang)
  }

}