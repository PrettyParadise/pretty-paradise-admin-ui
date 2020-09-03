import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductModel} from "../../core/models/product.model";
import {ProductsBackendHttpRequestsService} from "../products-backend-http-requests.service";
import {ErrorModel} from "../../core/models/error.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  productImage: File;
  productDetails: ProductModel = new ProductModel();
  errorModel: ErrorModel = null;


  constructor(private backendHttpRequestsService: ProductsBackendHttpRequestsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onCreateNewProduct(form: NgForm) {
    this.productDetails.name = form.value.name;
    this.productDetails.price = form.value.price;
    this.backendHttpRequestsService.addNewProduct(this.productDetails, this.productImage).subscribe(
      ()=>{
        this.backendHttpRequestsService.getAllProducts().subscribe(
          (updatedProducts) => {
            this.backendHttpRequestsService.updatedProducts.next(updatedProducts);
          }
        );
        this.router.navigate(['..'], {relativeTo: this.route});
      },
      (error: HttpErrorResponse) => {
        this.errorModel = error.error;
      }
    );
  }


  onNewProductImage(event: Event) {
    this.productImage = (<HTMLFormElement>event.target).files[0];
  }
}
