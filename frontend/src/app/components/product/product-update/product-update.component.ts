import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ProductService } from "../product.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "../product.model";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
  form: FormGroup;
  product: Product;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      id: [null],
      name: [null],
      price: [null],
    });

    const id = +this.route.snapshot.paramMap.get("id"); //Pega o id passado como parâmetro. O "+" converte string em number
    this.productService.readById(id).subscribe( product => {
      this.loadForm(product); //É necessário chamar a função de carregamento do formulário (loadForm) dentro do subscribe, ou seja, somente após o retorno da chamada assícrona, para que o o angular renderize o formulário somente após ter os dados. Caso contrário, se demorar o retorno, vai dar erro de undefined (pois vai tentar montar um formulário sem os dados.)
    });
  }

  loadForm(product: Product) {
    this.form.patchValue({
      id: product.id,
      name: product.name,
      price: product.price
    });

    /* Outra forma de setar os valores do formulário:
    this.form.controls["id"].setValue(product.id);
    this.form.controls["name"].setValue(product.name);
    this.form.controls["price"].setValue(product.price); */
  }

  onSubmit(): void {
    this.productService.update(this.form.value).subscribe( //o primeiro parâmetro é sucesso e o segundo é o erro
      () => {
        this.productService.showMessage("Produto atualizado com sucesso!");
        this.router.navigate(["/products"]);
      },
      (error) => {
        this.productService.showMessage("Erro ao atualizar.", true);
        console.error(error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
