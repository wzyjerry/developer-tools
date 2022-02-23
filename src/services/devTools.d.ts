declare namespace Tool {
  export type ViewObjectIdBindingModel = {
    objectId: string;
  };
  export type ViewObjectIdViewModel = {
    counter: number;
    machine?: number[];
    pid: number;
    time: string;
  };
}
