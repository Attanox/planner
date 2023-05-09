export type TData<T> = T extends Array<infer U> ? U : T;
