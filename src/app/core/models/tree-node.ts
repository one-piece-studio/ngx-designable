import { uid } from '@/app/shared/uid';

export interface ITreeNode {
  componentName?: string;
  sourceName?: string;
  operation?: any;
  hidden?: boolean;
  isSourceNode?: boolean;
  id?: string;
  props?: Record<string | number | symbol, any>;
  children?: ITreeNode[];
}

const TreeNodes = new Map<string, TreeNode>();

export class TreeNode {
  parent: TreeNode;

  root: TreeNode;

  rootOperation: any;

  id: string;

  depth = 0;

  hidden = false;

  componentName = 'NO_NAME_COMPONENT';

  sourceName = '';

  props: ITreeNode['props'] = {};

  children: TreeNode[] = [];

  isSelfSourceNode: boolean;

  constructor(node?: ITreeNode, parent?: TreeNode) {
    if (node instanceof TreeNode) {
      return node;
    }
    this.id = node.id || uid();
    if (parent) {
      this.parent = parent;
      this.depth = parent.depth + 1;
      this.root = parent.root;
      TreeNodes.set(this.id, this);
    } else {
      this.root = this;
      this.rootOperation = node.operation;
      this.isSelfSourceNode = node.isSourceNode || false;
      TreeNodes.set(this.id, this);
    }
    if (node) {
    }
  }

  get previous() {
    if (this.parent === this || !this.parent) return null;
    return this.parent.children[this.index - 1];
  }

  get next() {
    if (this.parent === this || !this.parent) return null;
    return this.parent.children[this.index + 1];
  }

  get siblings() {
    if (this.parent) {
      return this.parent.children.filter(node => node !== this);
    }
    return [];
  }

  get index() {
    if (this.parent === this || !this.parent) return 0;
    return this.parent.children.indexOf(this);
  }
}
