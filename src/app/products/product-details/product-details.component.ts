import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductModel} from '../../core/models/product.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductsBackendHttpRequestsService} from "../products-backend-http-requests.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorModel} from "../../core/models/error.model";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductModel = new ProductModel();
  errorModel: ErrorModel;
  image: string = ' ';
  @ViewChild('editComponent') editComponent: ElementRef;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsBackendHttpRequestsService: ProductsBackendHttpRequestsService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id: number = params.id;
      this.productsBackendHttpRequestsService.getProduct(id).subscribe(
        (product) => {
          this.product = product;

          this.image = `data:image/png;base64,${product.encodedImage || ''}`;
        },
        (error: HttpErrorResponse) => {
          this.errorModel = error.error;
        }
      );

    });
  }
}
