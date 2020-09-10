import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductModel} from '../../core/models/product.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductsBackendHttpRequestsService} from "../products-backend-http-requests.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ErrorModel} from "../../core/models/error.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductModel;
  errorModel: ErrorModel;
  image: string = ' ';
  newImageFile: File;
  @ViewChild('editedProductDetailsForm') editedProductDetailsForm: NgForm;
  @ViewChild('productDetailsEditModalCloseButton') productDetailsEditModalCloseButton: ElementRef;
  @ViewChild('productImageEditModalCloseButton') productImageEditModalCloseButton: ElementRef;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsBackendHttpRequestsService: ProductsBackendHttpRequestsService) {
    console.log('constructor called');
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id: number = params.id;
      this.productsBackendHttpRequestsService.getProduct(id).subscribe(
        (product) => {
          this.product = product;
          this.image = `data:image/png;base64,${product.encodedImage || ''}`;
          this.editedProductDetailsForm.setValue({
            productName: product.name,
            productPrice: product.price
          });
        },
        (error: HttpErrorResponse) => {
          this.errorModel = error.error;
        }
      );

    });
  }

  onSaveChangesEditedProductDetails(editedProductDetailsForm: NgForm) {
    // this.errorEditProductDetails = null; // clear any previous error
    this.product.name = this.editedProductDetailsForm.value.productName;
    this.product.price = this.editedProductDetailsForm.value.productPrice;
    this.productsBackendHttpRequestsService.editProductDetails(this.product).subscribe(
      (response) => {
        this.productDetailsEditModalCloseButton.nativeElement.click(); // trigger the click event of the Close button on modal
        this.updateProductsList();
      },
      (error: HttpErrorResponse) => {
        // this.errorEditProductDetails = error.error;
      }
    );
  }

  onSaveChangesNewImage() {
    // this.errorEditProductImage = null; // clean any previous error
    this.productsBackendHttpRequestsService.editProductImage(this.product.id, this.newImageFile).subscribe(
      (product: ProductModel) => {
        this.productImageEditModalCloseButton.nativeElement.click(); // trigger the click event of the Close button on modal
        this.image = `data:image/png;base64,${product.encodedImage || ''}`;
        this.updateProductsList();
      },
      (error: HttpErrorResponse) => {
        // this.errorEditProductImage = error.error;
      }
    );
  }

  onFileSelect(event) {
    this.newImageFile = event.target.files[0];
  }

  private updateProductsList() {
    // this.errorGetProducts = null; // clean any previous errors
    this.productsBackendHttpRequestsService.getAllProducts().subscribe(
      (products: ProductModel[]) => {
        this.productsBackendHttpRequestsService.updatedProducts.next(products);
      },
      (error: HttpErrorResponse) => {
        // this.errorGetProducts = error.error;
      }
    );

  }

  onDeleteProduct() {
    // this.errorDeleteProduct = null; // clean any previous errors
    const confirmMessage = 'Are you sure you want to delete this product';
    if (confirm(confirmMessage)) {
      this.productsBackendHttpRequestsService.deleteProduct(this.product.id).subscribe(
        (response) => {
          this.productsBackendHttpRequestsService.getAllProducts().subscribe(
            (updatedProducts) => {
              this.productsBackendHttpRequestsService.updatedProducts.next(updatedProducts);
            },
            (error: HttpErrorResponse) => {
              // this.errorGetProducts = error.error;
            }
          );
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        (error: HttpErrorResponse) => {
          // this.errorDeleteProduct = error.error;
        }
      );
    }
  }
}
