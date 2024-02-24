import { IResource, IResourceCreator } from './types';

export const createDesigner = () => {};

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
