import { Routes } from '@angular/router';
import { admin } from './Admin_Dashboard/admin/admin';
import { Dashboard } from './Admin_Dashboard/components/dashboard/dashboard';
import { Products } from './Admin_Dashboard/components/products/products';
import { Orders } from './Admin_Dashboard/components/orders/orders';
import { Customers } from './Admin_Dashboard/components/customers/customers';
import { Reports } from './Admin_Dashboard/components/reports/reports';

export const routes: Routes = [
    {path:'admin',component:admin,
        children:[
            {path:'dashboard',component:Dashboard},
            {path:'products',component:Products},
            {path:'orders',component:Orders},
            {path:'customers',component:Customers},
            {path:'reports',component:Reports}
        ]
    }
];
