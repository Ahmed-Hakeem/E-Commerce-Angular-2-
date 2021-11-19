import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit, AfterViewInit {
  @Input('product') product: Product;
  @Input('starList') starList: any[];
  inEditMode: boolean = false;
  form: FormGroup;
  isAddMode: boolean = false;
  loading = false;
  submitted = false;
  processSuccess = false;
  constructor(
    private route: ActivatedRoute,
    private prodService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.product = {
      id: 0,
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
      rating: {
        rate: 0,
        count: 0,
      },
    };
    this.starList = [];
    this.form = this.formBuilder.group({
      image: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', [Validators.required]],
    });
  }

  initializeStarList() {
    let i = 1;
    for (i = 1; i <= 5; i++) {
      if (i <= this.product.rating.rate) {
        this.starList.push('fas fa-star');
      } else if (i <= this.product.rating.rate + 0.5) {
        this.starList.push('fas fa-star-half');
      } else {
        this.starList.push('far fa-star');
      }
    }
  }

  getIdFromParams() {
    if (this.route.snapshot.params.id) {
      this.prodService
        .getProduct(this.route.snapshot.params.id)
        .subscribe((prod) => {
          this.product = prod as Product;
          this.inEditMode = true;

          this.form.patchValue(this.product);
        });
    } else if (this.route.snapshot.queryParamMap.get('isAddMode')) {
      this.isAddMode = true;
    }
  }
  ngOnInit(): void {
    this.getIdFromParams();
    this.initializeStarList();
  }

  // getter for form value
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    // do nothing if form invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  private createProduct() {
    this.prodService.addProduct(this.form.value).subscribe({
      next: (val) => {
        console.log(val);
        this.processSuccess = true;
        this.loading = false;
        this.router.navigate(['/productTable']);
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
        this.processSuccess = false;
      },
    });
  }

  private updateProduct() {
    this.prodService.updateProduct(this.product.id, this.form.value).subscribe({
      next: (val) => {
        console.log(val);
        this.loading = false;
        this.processSuccess = true;
        this.router.navigate(['/productTable']);
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
        this.processSuccess = false;
      },
    });
  }
  ngAfterViewInit() {}
}
