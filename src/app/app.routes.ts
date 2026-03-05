import { Routes } from '@angular/router';

/****************************
 * NOTE:
 *    - loadComponent() Is the modern equivalent of lazy loading feature of the module.
 *    - pathMatch       Defines pattern matching for the route.
 *                      Has two values: 'full'    ensure that the complete path is matched, eg: '/categories'
 *                                      'prefix'  ensure that the path starts with, eg: '' == /<anything>   (DEFAULT)
 *                      ALWAYS place more specific routes before parameterized routes.
 ***********/

/**
 * Defines the Route Table
 */
export const routes: Routes = [
  {
    path: 'categories',
    pathMatch: 'prefix',              // match with '/categories', '/categories/edit/10', '/categories/create', etc.
    loadComponent: () =>
      import('./features/categories/components/category-list/category-list.component')
        .then(m => m.CategoryListComponent)
  }
];
