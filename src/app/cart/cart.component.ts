import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
public cart = [];
public total = 0;

  constructor() { }

  ngOnInit() {

    this.cart = JSON.parse(localStorage.getItem('cartdata'));
    console.log('cart',this.cart);

    var previousProducts = JSON.parse(localStorage.getItem('products'));
    console.log('previousProducts', previousProducts)

    // var index = this.cart.findIndex(x => x.id == previousProducts[0].id);

    // console.log('index', index)
    // this.cart.splice(index, 1);
    // localStorage.setItem('cartdata',JSON.stringify(this.cart));
    // console.log('previodProduct', previousProducts)
    

    for(var i=0; i<this.cart.length; i++)
    {
      this.total += this.cart[i].quantity * this.cart[i].price;
    }
    // console.log(this.total);
    // this.deleteProduct();
    
  }

  deleteProduct(){
    this.cart = JSON.parse(localStorage.getItem('cartdata'));
    console.log('cart',this.cart);


    var previousProducts = JSON.parse(localStorage.getItem('products'));
    console.log('previousProducts', previousProducts)

    var index = this.cart.findIndex(x => x.id === previousProducts[0].id);

    console.log('index', index)
    this.cart.splice(index, 1);
    localStorage.setItem('cartdata',JSON.stringify(this.cart));
    console.log('previodProduct', previousProducts)
    this.total = 0;
    
  }

}
