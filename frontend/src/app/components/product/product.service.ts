import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Product } from './product.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class ProductService {

  private readonly API: string = `${environment.API}products`;

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });    
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>(this.API, product);
  }

  read(): Observable<Product[]>{
    return this.http.get<Product[]>(this.API);
  }

  readById(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.API}/${id}`);
  }

  update(product : Product): Observable<Product>{
    return this.http.put<Product>(`${this.API}/${product.id}`, product);
  }
  
  delete(id: number): Observable<Product>{
    return this.http.delete<Product>(`${this.API}/${id}`);
  }
}
