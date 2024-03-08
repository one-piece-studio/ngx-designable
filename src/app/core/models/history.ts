export interface IHistoryProps<T> {
  onPush?: (item: T) => void;
  onRedo?: (item: T) => void;
  onUndo?: (item: T) => void;
  onGoto?: (item: T) => void;
}

export interface HistoryItem<T> {
  data: T;
  type?: string;
  timestamp: number;
}

export interface ISerializable {
  from(json: any): void; //导入数据
  serialize(): any; //序列化模型，用于历史记录保存
}

export class History<T extends ISerializable = any> {
  context: ISerializable;
  props: IHistoryProps<HistoryItem<T>>;
  current = 0;
  history: HistoryItem<T>[] = [];
  updateTimer = null;
  maxSize = 100;
  locking = false;
}
