import {HttpClient} from "@angular/common/http";
import {ProductModel} from "../core/models/product.model";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductsBackendHttpRequestsService {
  private backendAdminProductBaseUrl = 'prettyparadise/products';
  updatedProducts = new Subject<ProductModel[]>();

  constructor(private http: HttpClient) {
  }

  getAllProducts(){
    return this.http.get<ProductModel[]>(this.backendAdminProductBaseUrl);
  }

  getProduct(id: number){
    return this.http.get<ProductModel>(this.backendAdminProductBaseUrl+ '/' +id);
  }

  addNewProduct(productDetails: ProductModel, productImage: File) {
    let formData = new FormData();
    formData.append('productDetails', new Blob([JSON.stringify(productDetails)], {type : 'application/json'}));
    formData.append('productImage', productImage);
    return this.http.post(this.backendAdminProductBaseUrl, formData);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.backendAdminProductBaseUrl + '/' + id);
  }

  editProductDetails(editedProductModel: ProductModel){
    let formData = new FormData();
    formData.append('productDetails', new Blob([JSON.stringify(editedProductModel)], {type : 'application/json'}));
    return this.http.put(this.backendAdminProductBaseUrl + '/' + editedProductModel.id + '/details', formData);
  }

  editProductImage(id: number, newImage: File){
    let formData = new FormData();
    formData.append('productImage', newImage);
    return this.http.put(this.backendAdminProductBaseUrl + '/' + id + '/image', formData);
}
}
