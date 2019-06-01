import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductserviceService } from '../productservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  product: FormGroup;
  public pproduct = [];


  constructor(private fb: FormBuilder,
    private productService: ProductserviceService,private toastr: ToastrService) { 
    this.product = this.fb.group({
      name: ["", [Validators.required]],
      price: ["", [Validators.required]],
      qty: ["", [Validators.required]],
      category: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    // localStorage.removeItem("products");
      this.pproduct = this.productService.fetchProduct();
    // console.log(timestamp);
  }
  
 
  saveProduct(){
    var previousProducts = JSON.parse(localStorage.getItem('products')) || [];
    var count = previousProducts.length;
    // console.log(count);
    
    if(count < 1)
    {
      var id = 1;
      var path = "assets/images/"+id+".jpg";
      console.log('if')
    }else{
      var id = ++count;
      console.log(id);
      var path = "assets/images/"+id+".jpg"
      console.log('else');
    }
    // var timestamp = new Date().getUTCMilliseconds();
    var productData = {
        'id': id,
        'name': this.product.value.name,
        'price': this.product.value.price,
        'quantity': this.product.value.qty,
        'category': this.product.value.category,
        'image': path
      };
      
    // this.product.id = timestamp; 

    previousProducts.push(productData);

    localStorage.setItem("products", JSON.stringify(previousProducts));
    this.pproduct = this.productService.fetchProduct();
      // this.fetchProduct();
      // this.pproduct = this.fetchProduct();
    this.toastr.success('Product Added Successfully');
    this.product.reset();
    // console.log(previousProducts);
  }

  onDelete(id){
    //findIndex(used to find particular index) and slice(slice is used to delete that particulr index) 
    var index = this.pproduct.findIndex(x => x.id === id);
    this.pproduct.splice(index,1); //(index,1) delete only particular array element according to index
    localStorage.setItem('products', JSON.stringify(this.pproduct));
  }
}
