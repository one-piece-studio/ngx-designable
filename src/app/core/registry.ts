import _ from 'lodash';
import {
  IBehavior,
  IBehaviorLike,
  IDesignerBehaviors,
  IDesignerBehaviorStore,
  IDesignerIcons,
  IDesignerIconsStore,
  IDesignerLanguageStore,
  IDesignerLocales,
  IDesignerLocaleStore
} from './types';
import { JSONPath } from 'jsonpath-plus';
import icons from '../locales/icons';
import panels from '../locales/panels';
import operations from '../locales/operations';
import global from '../locales/global';

import { observable } from '@formily/reactive';
import { isBehaviorHost, isBehaviorList } from '@/app/core/externals';
import { getBrowserLanguage, lowerSnake, mergeLocales } from '@/app/core/internals';
import { TreeNode } from '@/app/core/models';

const reSortBehaviors = (target: IBehavior[], sources: IDesignerBehaviors) => {
  const findTargetBehavior = (behavior: IBehavior) => target.includes(behavior);
  const findSourceBehavior = (name: string) => {
    for (const key in sources) {
      const { Behavior } = sources[key];
      for (let i = 0; i < Behavior.length; i++) {
        if (Behavior[i].name === name) return Behavior[i];
      }
    }
    return null;
  };
  _.each(sources, item => {
    if (!item) return;
    if (!isBehaviorHost(item)) return;
    const { Behavior } = item;
    _.each(Behavior, behavior => {
      if (findTargetBehavior(behavior)) return;
      const name = behavior.name;
      _.each(behavior.extends, dep => {
        const behavior = findSourceBehavior(dep);
        if (!behavior) throw new Error(`No ${dep} behavior that ${name} depends on`);
        if (!findTargetBehavior(behavior)) {
          target.unshift(behavior);
        }
      });
      target.push(behavior);
    });
  });
};

const getISOCode = (language: string) => {
  let isoCode = DESIGNER_LANGUAGE_STORE.value;
  const lang = lowerSnake(language);
  if (DESIGNER_LOCALES_STORE.value[lang]) {
    return lang;
  }
  _.each(DESIGNER_LOCALES_STORE.value, (_, key: string) => {
    if (key.indexOf(lang) > -1 || String(lang).indexOf(key) > -1) {
      isoCode = key;
      return false;
    }
    return undefined;
  });
  return isoCode;
};

const DESIGNER_BEHAVIORS_STORE: IDesignerBehaviorStore = observable.ref([]);

const DESIGNER_ICONS_STORE: IDesignerIconsStore = observable.ref({});

const DESIGNER_LOCALES_STORE: IDesignerLocaleStore = observable.ref({});

const DESIGNER_LANGUAGE_STORE: IDesignerLanguageStore = observable.ref(getBrowserLanguage());
export const GlobalRegistry = {
  setDesignerLanguage: (lang: string) => {
    DESIGNER_LANGUAGE_STORE.value = lang;
  },

  setDesignerBehaviors: (behaviors: IBehaviorLike[]) => {
    DESIGNER_BEHAVIORS_STORE.value = behaviors.reduce<IBehavior[]>((buf, behavior) => {
      if (isBehaviorHost(behavior)) {
        return buf.concat(behavior.Behavior);
      } else if (isBehaviorList(behavior)) {
        return buf.concat(behavior);
      }
      return buf;
    }, []);
  },

  getDesignerBehaviors: (node: TreeNode) => {
    return DESIGNER_BEHAVIORS_STORE.value.filter(pattern => pattern.selector(node));
  },

  getDesignerIcon: (name: string) => {
    return DESIGNER_ICONS_STORE[name];
  },

  getDesignerLanguage: () => {
    return getISOCode(DESIGNER_LANGUAGE_STORE.value);
  },

  getDesignerMessage: (token: string, locales?: IDesignerLocales) => {
    const lang = getISOCode(DESIGNER_LANGUAGE_STORE.value);
    const locale = locales ? locales[lang] : DESIGNER_LOCALES_STORE.value[lang];
    if (!locale) {
      for (const key in DESIGNER_LOCALES_STORE.value) {
        const message = JSONPath({ json: DESIGNER_LOCALES_STORE.value[key], path: lowerSnake(token) });
        if (message) return message;
      }
      return;
    }
    return JSONPath({ json: locale, path: lowerSnake(token) });
  },

  registerDesignerIcons: (map: IDesignerIcons) => {
    Object.assign(DESIGNER_ICONS_STORE, map);
  },

  registerDesignerLocales: (...packages: IDesignerLocales[]) => {
    packages.forEach(locales => {
      mergeLocales(DESIGNER_LOCALES_STORE.value, locales);
    });
  },

  registerDesignerBehaviors: (...packages: IDesignerBehaviors[]) => {
    const results: IBehavior[] = [];
    packages.forEach(sources => {
      reSortBehaviors(results, sources);
    });
    if (results.length) {
      DESIGNER_BEHAVIORS_STORE.value = results;
    }
  }
};

GlobalRegistry.registerDesignerLocales(icons, panels, global, operations);
