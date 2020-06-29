import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "./dialog/dialog.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(msg: string) {
    return this.dialog.open(DialogComponent, {
      width: "390px",
      panelClass: "confirm-dialog-container", //Classe CSS, aplicada no arquivo Styles.css global, só funciona lá.
      disableClose: true,
      data: {
        message: msg,
      },
    });
  }
}
