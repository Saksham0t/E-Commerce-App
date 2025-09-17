import { Injectable } from '@angular/core';
import ProductsList from './ProductsList';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Orders } from './Orders';
import Users from './Users';

@Injectable({
  providedIn: 'root'
})
export class Rest1 {
  constructor(private rest:HttpClient){}
  strUrl:string="http://localhost:3000";
  getData(link:string):Observable<any>{
    return this.rest.get<any>(this.strUrl+link);
  }
  insertProductData(Product:ProductsList):Observable<any>{
    return this.rest.post(this.strUrl+"/ProductsList",Product);
  }
  updateRecord(Product:ProductsList):Observable<any>{
    let strUpdateUrl=this.strUrl+"/ProductsList/"+Product.id;
    console.log(Product.id);
    return this.rest.put(strUpdateUrl,Product);
  }
  deleteRecord(Product:ProductsList):Observable<any>{
    let deleteRecordURL=this.strUrl+"/ProductsList/"+Product.id.toString();
    return this.rest.delete(deleteRecordURL);
  }
  updateOrderRecord(OrderRec:Orders):Observable<any>{
    let strUpdateUrl=this.strUrl+"/OrdersList/"+OrderRec.id;
    return this.rest.put(strUpdateUrl,OrderRec);
  }

  updateCustomerRecord(UserRec:Users):Observable<any>{
    let strUpdateUrl=this.strUrl+"/users/"+UserRec.id;
    return this.rest.put(strUpdateUrl,UserRec);
  }

  
}
