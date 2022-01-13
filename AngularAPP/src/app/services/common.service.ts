import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Icons } from '../constant/icon.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private snackBar: MatSnackBar) { }

  showSnakBar(message: string, panelClass: string, verticalPosition: MatSnackBarVerticalPosition = "top", duration: number = 2000) {
    return this.snackBar.open(message, "", { panelClass: panelClass, verticalPosition: verticalPosition, duration: duration });
  }

  getFormatedDate(date: any) {
    return new DatePipe('en-GB').transform(date, 'MMM dd, yyyy');
  }

  getMatIconList() {
    return Icons;
  }
}
