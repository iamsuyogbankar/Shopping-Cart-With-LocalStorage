import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../productservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public allProduct = [];
public filterData:any = [];

  constructor(private productServie: ProductserviceService) { }

  ngOnInit() {
    this.allProduct = this.productServie.fetchProduct();
    // console.log(this.allProduct);
  }

  addtoCart(id){
    this.filterData = this.productServie.addtoCart(id);
    // console.log(this.filterData)
  }

}
