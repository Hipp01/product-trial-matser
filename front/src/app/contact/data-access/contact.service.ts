import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _contacts = new BehaviorSubject<any[]>([]);
  contacts$ = this._contacts.asObservable();
}
