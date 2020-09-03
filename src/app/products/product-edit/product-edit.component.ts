import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductModel} from '../../core/models/product.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, NgForm} from '@angular/forms';
import {ProductsBackendHttpRequestsService} from "../products-backend-http-requests.service";
import {ErrorModel} from "../../core/models/error.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit{
  product: ProductModel = new ProductModel();
  errorGetProduct: ErrorModel = null;
  errorGetProducts: ErrorModel = null;
  errorDeleteProduct: ErrorModel = null;
  @ViewChild('form') editForm: NgForm;

  constructor(private route: ActivatedRoute,
              private productsBackendHttpRequestsService: ProductsBackendHttpRequestsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productsBackendHttpRequestsService.getProduct(params.id).subscribe(
        (product) =>{
          this.product = product;
          this.editForm.setValue({
            productName: product.name,
            productPrice: product.price
          })
        },
        (error: HttpErrorResponse) =>{
          this.errorGetProduct = error.error;
        });

    });
  }

  onSubmit(form: NgForm) {
  }

  onFileSelect(event) {
  }

  onDeleteProduct() {
    const confirmMessage = "Are you sure you want to delete this product "
    if (confirm(confirmMessage)){
      this.productsBackendHttpRequestsService.deleteProduct(this.product.id).subscribe(
        (response) => {
          console.log("Success")
          console.log(response)
          this.productsBackendHttpRequestsService.getAllProducts().subscribe(
            (updatedProducts) => {
              this.productsBackendHttpRequestsService.updatedProducts.next(updatedProducts);
            },
            (error: HttpErrorResponse) => {
              this.errorGetProducts = error.error;
            }

          );
          this.router.navigate(['../../'], {relativeTo: this.route});
        },
        (error: HttpErrorResponse) =>{
          this.errorDeleteProduct = error.error;
          console.error(this.errorDeleteProduct)
        }
      )
    }
  }
}
