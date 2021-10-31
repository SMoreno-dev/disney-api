import { Request } from "express";

export type RequestWithToken = Request & {
  headers: {
    authorization: string;
  };
};

export type CharacterListQuery = {
  name?: string;
  age?: number;
  movies?: string;
};

export type CharacterListRequest = RequestWithToken & {
  query: CharacterListQuery;
};
