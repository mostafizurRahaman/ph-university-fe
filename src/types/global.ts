/* eslint-disable @typescript-eslint/no-explicit-any */
//   ** Type For Error :

import { BaseQueryApi } from "@reduxjs/toolkit/query";

export interface IErrorResponse {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
}

//  ** Types Meta In Response **----::---** //
export interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

//  ** Types Data in Response **---::---** //
export interface IResponse<T> {
  data?: T;
  meta?: IMeta;
  error?: IErrorResponse;
  success: boolean;
  message: string;
}


export type TResponseRedux<T> = IResponse<T> & BaseQueryApi; 