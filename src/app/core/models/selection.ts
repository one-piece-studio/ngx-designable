import { Operation } from './operation';

export interface ISelection {
  selected?: string[];
  operation?: Operation;
}
export class Selection {
  operation: Operation;
  selected: string[] = [];
  indexes: Record<string, boolean> = {};
}
