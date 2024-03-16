import { IBehavior, IBehaviorCreator, IBehaviorHost, IResource, IResourceCreator } from './types';
import { Engine, TreeNode } from '@/app/core/models';
import { DEFAULT_DRIVERS, DEFAULT_EFFECTS } from '@/app/core/presets';
import { isArr } from '@/app/shared/types';

export const createResource = (...sources: IResourceCreator[]): IResource[] => {
  return sources.reduce((buf, source) => {
    return buf.concat({
      ...source,
      node: new TreeNode({
        componentName: '$$ResourceNode$$',
        isSourceNode: true,
        children: source.elements || []
      })
    });
  }, []);
};

export const createBehavior = (...behaviors: Array<IBehaviorCreator | IBehaviorCreator[]>): IBehavior[] => {
  return behaviors.reduce((buf: any[], behavior) => {
    if (isArr(behavior)) return buf.concat(createBehavior(...behavior));
    const { selector } = behavior || {};
    if (!selector) return buf;
    if (typeof selector === 'string') {
      behavior.selector = node => node.componentName === selector;
    }
    return buf.concat(behavior);
  }, []);
};

export const isResourceList = (val: any): val is IResource[] => Array.isArray(val) && val.every(isResource);

export const isResource = (val: any): val is IResource => val?.node;

export const isBehavior = (val: any): val is IBehavior =>
  val?.name || val?.selector || val?.extends || val?.designerProps || val?.designerLocales;

export const isBehaviorHost = (val: any): val is IBehaviorHost => val?.Behavior && isBehaviorList(val.Behavior);

export const isBehaviorList = (val: any): val is IBehavior[] => Array.isArray(val) && val.every(isBehavior);

export const createDesigner = () => {
  return new Engine({
    effects: [...DEFAULT_EFFECTS],
    drivers: [...DEFAULT_DRIVERS]
  });
};
