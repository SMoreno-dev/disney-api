export type Database = { [key: string]: any };
export type KeyOfDB = Extract<keyof Database, string>;
