import { Injectable } from '@angular/core';
import { globalThisPolyfill } from '../shared/globalThisPolyfill';
import _ from 'lodash';
import { IDesignerLocales } from '../core/types';
import { JSONPath } from 'jsonpath-plus';
import icons from '../locales/icons';
import panels from '../locales/panels';
import operations from '../locales/operations';
import global from '../locales/global';

@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  DESIGNER_LOCALES_STORE = {};

  constructor() {
    this.registerDesignerLocales(icons, panels, global, operations);
  }

  lowerSnake = (str: string) => {
    return String(str).replace(/\s+/g, '_').toLocaleLowerCase();
  };

  getBrowserLanguage = () => {
    /* istanbul ignore next */
    if (!globalThisPolyfill.navigator) {
      return 'en';
    }
    return globalThisPolyfill.navigator['browserlanguage'] || globalThisPolyfill.navigator?.language || 'en';
  };

  getISOCode = (language: string) => {
    let isoCode = this.DESIGNER_LOCALES_STORE;
    const lang = this.lowerSnake(language);
    if (this.DESIGNER_LOCALES_STORE[lang]) {
      return lang;
    }
    _.each(this.DESIGNER_LOCALES_STORE, (_, key: string) => {
      if (key.indexOf(lang) > -1 || String(lang).indexOf(key) > -1) {
        isoCode = key;
      }
    });
    return isoCode;
  };

  registerDesignerLocales = (...packages: IDesignerLocales[]) => {
    packages.forEach(locale => {
      this.mergeLocales(this.DESIGNER_LOCALES_STORE, locale);
    });
  };

  getDesignerMessage = (token: string, locales?: IDesignerLocales) => {
    const language = this.getBrowserLanguage();

    const lang = this.getISOCode(language) as any;
    const locale = locales ? locales[lang] : this.DESIGNER_LOCALES_STORE[lang];
    if (!locale) {
      for (const key in this.DESIGNER_LOCALES_STORE) {
        const message = JSONPath({ json: this.DESIGNER_LOCALES_STORE[key], path: this.lowerSnake(token) });
        if (message) return message;
      }
      return;
    }
    return JSONPath({ json: locale, path: this.lowerSnake(token) });
  };

  isPlainObj = (obj: any) => typeof obj == 'object';

  mergeLocales = (target: any, source: any) => {
    if (this.isPlainObj(target) && this.isPlainObj(source)) {
      _.each(source, (value, key) => {
        const token = this.lowerSnake(key);
        target[token] = this.mergeLocales(target[key] || target[token], value);
      });
      return target;
    } else if (this.isPlainObj(source)) {
      const result = Array.isArray(source) ? [] : {};
      _.each(source, (value, key) => {
        result[this.lowerSnake(key)] = this.mergeLocales(undefined, value);
      });
      return result;
    }
    return source;
  };
}
