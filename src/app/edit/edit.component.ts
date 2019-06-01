import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductserviceService } from '../productservice.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
public editForm: FormGroup;
public productid;
public filterData = [];
  
  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private productService: ProductserviceService,private fb: FormBuilder) {

      //taking url and id from url using activatedRoute.snapshot.params
      const routeParams = this.activatedRoute.snapshot.params;
      this.productid = routeParams.id;
      // console.log("id", productid);
  
      var fetchdata = this.productService.fetchProduct();
  
      this.filterData = fetchdata.filter(m => m.id == this.productid);

      this.editForm = this.fb.group({
        name: [this.filterData[0].name,[Validators.required]],
        price: [this.filterData[0].price, [Validators.required]],
        qty: [this.filterData[0].quantity, [Validators.required]],
        category: [this.filterData[0].category, [Validators.required]]
      })
    }
      
   

  ngOnInit() {
  }

  editProduct(){
    var editProducts = this.productService.fetchProduct();
    // console.log("editProducts", editProducts);
    
    var newData = {
      'id': this.productid,
      'name': this.editForm.value.name,
      'price': this.editForm.value.price,
      'quantity': this.editForm.value.qty,
      'category': this.editForm.value.category,
      'image': 'assets/images/'+this.productid+'.jpg'
    };

    // console.log(newData);
    var index = editProducts.findIndex(m => m.id == this.productid);
    
    console.log(index)
    editProducts[index] = newData;
    // console.log(editProducts);
    localStorage.setItem('products',JSON.stringify(editProducts))
    console.log(JSON.parse(localStorage.getItem('products')))

    this.editForm.reset();
    this.router.navigate(['']);
  }

}
