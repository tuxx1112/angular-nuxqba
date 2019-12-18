import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { CartService} from '../cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  checkoutForm;
  subTotallie;
  shippingCosts;
  shipCost = 0;
  selected = 0;
  subtotal = 0;
  constructor(
    private cartService: CartService, 
    private formBuilder: FormBuilder,
    ) {
      this.items = this.cartService.getItems();

      this.checkoutForm = this.formBuilder.group({
        name: '',
        address: '',
      });
    }


    subTotalWithShipping(items, selected) {
      let subtotal = 0;
      items.forEach(function (item) {
        subtotal = subtotal + item.price;
      });
      this.subTotallie = subtotal + selected;
    }

    onSubmit(customerData) {
      console.warn('Your order has been submitted', customerData);
      this.items = this.cartService.clearCart();
      this.checkoutForm.reset();
    }

    onChange(selected) {
      this.subTotalWithShipping(this.items, selected)
    }

  ngOnInit() {
    this.subTotalWithShipping(this.items, 0);
    this.shippingCosts = this.cartService.getShippingPrices();
  }

}