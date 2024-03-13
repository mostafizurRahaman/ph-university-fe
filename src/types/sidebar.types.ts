import { ReactNode } from "react";

export type TChildrenRoutes = Pick<IRoutes, "name" | "path" | "element">;

export interface TRoute {
  path: string;
  element: ReactNode;
}

export interface IRoutes {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TChildrenRoutes[];
}

export interface ISideBarRoute {
  key: string | number;
  label: ReactNode;
  children?: (ISideBarChildRoute | undefined)[];
}

type ISideBarChildRoute = Pick<ISideBarRoute, "label" | "key">;
