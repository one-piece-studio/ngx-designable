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
