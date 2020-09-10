import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './core/components/header/header.component';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {HomeComponent} from './home/home.component';
import {NewProductComponent} from './products/new-product/new-product.component';
import {ProductDetailsComponent} from './products/product-details/product-details.component';
import {ProductStartComponent} from './products/product-start/product-start.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { ErrorComponent } from './core/components/error/error.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'products', component: ProductsComponent, children: [
      {path: '', component: ProductStartComponent},
      {path: 'new', component: NewProductComponent},
      {path: ':id', component: ProductDetailsComponent}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    HomeComponent,
    NewProductComponent,
    ProductDetailsComponent,
    ProductStartComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
