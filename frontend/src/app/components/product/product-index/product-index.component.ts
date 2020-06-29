import { Component, OnInit, AfterViewInit, ViewChild } from "@angular/core";
import { Product } from "../product.model";
import { ProductService } from "../product.service";
import { DialogService } from "../../shared/dialog.service";
import { switchMap } from "rxjs/operators";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: "app-product-index",
  templateUrl: "./product-index.component.html",
  styleUrls: ["./product-index.component.css"],
})
export class ProductIndexComponent implements OnInit {
  
  products: MatTableDataSource<Product>;
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ["id", "name", "price", "options"];


  constructor(
    private diaologService: DialogService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadTable();
  }

  loadTable(): void {
    this.productService.read().subscribe(
      (products) => {
        this.products = new MatTableDataSource(products);
        this.products.sort = this.sort; 

        this.products.paginator = this.paginator;
      },
      (error) => {
        this.productService.showMessage("Erro ao listar os produtos.", true);
        console.error(error);
      }
    );
  }

  onDelete(id: number): void {
    this.diaologService
      .openConfirmDialog("Você tem certeza que deseja excluir este arquivo?")
      .afterClosed()
      .pipe(
        //É necessário usar o pipe e o switchMap para aninhar mais de um observable. Neste caso são dois observables: 1 para buscar a resposta do dialog confirm e outro para executar a exclusão do registro
        switchMap((dialogResponse) => {
          //dialogResponse retorna true ou false (se o usuário confirmou ou não o Confirm dialog)
          if (dialogResponse) return this.productService.delete(id);
        })
      )
      .subscribe(
        () => {
          //Ese subscrive se inscreve no observable passado no switchMap
          this.productService.showMessage("Produto excluído com sucesso!"),
            this.loadTable();
        },
        (error) => {
          this.productService.showMessage("Erro ao excluir.", true);
          console.error(error);
        }
      );
  }

  public doFilter = (value: string) => {
    this.products.filter = value.trim().toLocaleLowerCase();
  }
}
