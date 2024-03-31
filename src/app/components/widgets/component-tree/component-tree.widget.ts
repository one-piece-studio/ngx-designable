import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { usePrefix } from '@/app/utils';
import { TreeNodeWidget } from '../tree-node/tree-node.widget';
import { IDesignerComponents } from '../../types';
import { GlobalRegistry } from '@/app/core/registry';
import { Engine, TreeNode } from '@/app/core/models';

@Component({
  selector: 'app-component-tree-widget',
  standalone: true,
  template: `
    <div class="{{ prefix }}" [style]="style" #container>
      <app-tree-node-widget [node]="tree"></app-tree-node-widget>
    </div>
  `,
  styleUrls: ['./component-tree.widget.less'],
  imports: [TreeNodeWidget],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentTreeWidget implements OnChanges, AfterViewInit {
  @ViewChild('container') container: ElementRef;

  prefix = usePrefix('component-tree');

  @Input() components: IDesignerComponents;

  @Input() style: { [p: string]: any };

  tree: TreeNode;

  displayName = 'ComponentTreeWidget';

  constructor(
    private designer: Engine,
    private renderer2: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.components && changes.components.currentValue) {
      this.registerDesignerBehaviors();
    }
  }

  ngAfterViewInit(): void {
    this.tree = this.useTree();
    this.renderer2.setAttribute(this.container.nativeElement, `${this.designer?.props?.nodeIdAttrName}`, this.tree.id);
  }

  registerDesignerBehaviors() {
    GlobalRegistry.registerDesignerBehaviors(this.components);
  }

  useTree() {
    return this.designer.workbench.currentWorkspace.operation.tree;
  }
}
