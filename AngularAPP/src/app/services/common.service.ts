import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Icons } from '../constant/icon.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private _hasToolbar = new BehaviorSubject<boolean>(true);
  public readonly hasToolbar = this._hasToolbar.asObservable();

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

  showToolbar() {
    this._hasToolbar.next(true);
  }

  hideToolbar() {
    this._hasToolbar.next(false);
  }
}
