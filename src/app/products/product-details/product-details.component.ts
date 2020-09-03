import {Component, OnInit} from '@angular/core';
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
          console.log(this.product);
        },
        (error: HttpErrorResponse) => {
          this.errorModel = error.error;
        }
      );

    });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
