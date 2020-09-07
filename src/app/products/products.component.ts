import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from '../core/models/product.model';
import {ProductsBackendHttpRequestsService} from "./products-backend-http-requests.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ErrorModel} from "../core/models/error.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: []
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  error: ErrorModel = null;
  newProductsSubscription: Subscription;
  productImages: string[] = [];

  constructor(private productsBackendHttpRequestsService: ProductsBackendHttpRequestsService) { }

  ngOnInit(): void {
    this.productsBackendHttpRequestsService.getAllProducts().subscribe(
      (products) => {
        this.products = products
        this.productImages = []
        for (let product of products) {
          this.productImages.push(`data:image/png;base64,${product.encodedImage || ''}`)
        }
      },
      (error: HttpErrorResponse) => {
        this.error = error.error;
      }
    );
    this.newProductsSubscription = this.productsBackendHttpRequestsService.updatedProducts.subscribe(
      (updatedProducts) => {
        this.products = updatedProducts;
        this.productImages = [];
        for (let product of updatedProducts) {
          this.productImages.push(`data:image/png;base64,${product.encodedImage || ''}`)
        }
      }
    )

  }

  ngOnDestroy() {
    this.newProductsSubscription.unsubscribe();
  }
}
