import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-product-create",
  templateUrl: "./product-create.component.html",
  styleUrls: ["./product-create.component.css"],
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null],
      price: [null],
    });
  }

  onSubmit() {
    this.productService.create(this.form.value).subscribe(
      () => {
        this.productService.showMessage("Produto criado com sucesso!");
        this.router.navigate(["/products"]);
      },
      (error) => {
        this.productService.showMessage("Erro ao cadastrar.", true);
        console.error(error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
