import { IBehavior, IBehaviorHost, IResource, IResourceCreator } from './types';
import { Engine } from '@/app/core/models';

export const createResource = (...sources: IResourceCreator[]): IResource[] => {
  return sources.reduce((buf, source) => {
    return buf.concat({
      ...source,
      node: {
        componentName: '$$ResourceNode$$',
        isSourceNode: true,
        children: source.elements || []
      }
    });
  }, []);
};

export const isResourceList = (val: any): val is IResource[] => Array.isArray(val) && val.every(isResource);

export const isResource = (val: any): val is IResource => val?.node;

export const isBehavior = (val: any): val is IBehavior =>
  val?.name || val?.selector || val?.extends || val?.designerProps || val?.designerLocales;

export const isBehaviorHost = (val: any): val is IBehaviorHost => val?.Behavior && isBehaviorList(val.Behavior);

export const isBehaviorList = (val: any): val is IBehavior[] => Array.isArray(val) && val.every(isBehavior);

export const createDesigner = () => {
  return new Engine();
};
