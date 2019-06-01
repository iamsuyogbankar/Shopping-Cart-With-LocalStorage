import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
public checkout = [];
public total = 0;
public filterData = [];

  constructor(private toastr: ToastrService,
              private productService: ProductserviceService) { }

  ngOnInit() {
    this.checkout = JSON.parse(localStorage.getItem('cartdata')); //cart data
    console.log('checkoutdata', this.checkout);

    // var fetchdata = JSON.parse(localStorage.getItem('products')); //product data

    // console.log('fetchDAta',fetchdata);

    // this.filterData = this.checkout.filter(pid => pid.id == fetchdata[0].id);
    // console.log('newFilterData',this.filterData);

    // console.log(this.checkout);

    for(var i=0; i<this.checkout.length; i++)
    {
      this.total += this.checkout[i].price * this.checkout[i].quantity;
    }
    
  }




  onCheckout(){
    this.toastr.success('Thank You For Shopping With Us','Order Placed Successfully');
  }

}
