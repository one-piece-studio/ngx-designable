export interface ICustomEvent<EventData = any, EventContext = any> {
  type: string;
  data?: EventData;
  context?: EventContext;
}
