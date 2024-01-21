import { IRoutes, TChildrenRoutes, TRoute } from "../types";

export const routesGenerator = (items: IRoutes[]) => {
   const result = items?.reduce((acc: TRoute[], item) => {
      if (item.path && item.element) {
         acc.push({
            path: item.path,
            element: item.element,
         });
      }

      if (item.name && item.children) {
         item.children.forEach((child: TChildrenRoutes) => {
            if (child.path && child.element) {
               acc.push({ path: child.path, element: child.element });
            }
         });
      }

      return acc;
   }, []);

   return result;
};
