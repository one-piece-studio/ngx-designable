export interface IDesignerLocales {
  [ISOCode: string]: {
    [key: string]: any;
  };
}

export interface IDesignerMiniLocales {
  [ISOCode: string]: string;
}

export interface IResource {
  title?: string | IDesignerMiniLocales;
  description?: string | IDesignerMiniLocales;
  icon?: any;
  thumb?: string;
  span?: number;
  node?: any;
}

export type IResourceLike = IResource[];

export interface IResourceCreator {
  title?: string | IDesignerMiniLocales;
  description?: string | IDesignerMiniLocales;
  icon?: any;
  thumb?: string;
  span?: number;
  elements?: any;
}
