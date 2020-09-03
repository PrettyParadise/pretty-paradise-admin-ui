import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductModel} from '../core/models/product.model';
import {ProductsBackendHttpRequestsService} from "./products-backend-http-requests.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: []
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductModel[] = [];
  newProductsSubscription: Subscription;

  constructor(private productsBackendHttpRequestsService: ProductsBackendHttpRequestsService) { }

  ngOnInit(): void {
    this.productsBackendHttpRequestsService.getAllProducts().subscribe(
      (products) => {
        this.products = products
      }
    );
    this.newProductsSubscription = this.productsBackendHttpRequestsService.updatedProducts.subscribe(
      (updatedProducts) => {
        this.products = updatedProducts;
      }
    )

  }

  ngOnDestroy() {
    this.newProductsSubscription.unsubscribe();
  }
}
