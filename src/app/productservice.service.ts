import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor() { }

  fetchProduct(){
    // localStorage.removeItem('cartdata');
    return JSON.parse(localStorage.getItem('products')) || []; //saved data of product into localStorage
  }

  //add products from home page cart
  addtoCart(id){
    //filtering selected data with incoming data from localstorage using id
    var fetchdata = this.fetchProduct().filter(m => m.id == id);
    // console.log('Selected Product', fetchdata)
    var previousCartItems = JSON.parse(localStorage.getItem('cartdata')) || [];

    // console.log('previousItem',previousCartItems);
    // console.log(fetchdata[0].id);

    var addmore = previousCartItems.filter(d => d.id == fetchdata[0].id);
    var index = previousCartItems.findIndex(d => d.id == fetchdata[0].id)
    
    // console.log('Matheched',addmore);
    // console.log('INdex',index);


    if(addmore.length > 0)
    {
      console.log(addmore.qty)
        var cartItem:any = {
          "id": fetchdata[0].id,
          "name": fetchdata[0].name,
          "price": fetchdata[0].price,
          // "qty": addmore.quantity
          "quantity":fetchdata[0].quantity
        };
        previousCartItems[index] = cartItem;
    } else {
      // console.log('Not Exits')

      var cartItem:any = {
        "id": fetchdata[0].id,
        "name": fetchdata[0].name,
        "price": fetchdata[0].price,
        "quantity": 1
      };
      previousCartItems.push(cartItem);
    }

    // console.log('final',previousCartItems)
    // console.log('addmore',addmore);
   

    localStorage.setItem("cartdata", JSON.stringify(previousCartItems));
    console.log(localStorage.getItem('cartdata'));
    
  }

  

  fetchRegister(){
    // localStorage.removeItem('registers')
    return JSON.parse(localStorage.getItem('registers')) || [];    
  }
  
}


