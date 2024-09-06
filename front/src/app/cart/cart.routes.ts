import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { CartComponent } from "./features/cart/cart.component";

export const CART_ROUTES: Routes = [
	{
		path: "list",
		component: CartComponent,
	},
	{ path: "**", redirectTo: "list" },
];
