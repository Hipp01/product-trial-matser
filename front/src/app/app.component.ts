import {
  Component, OnInit
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { Router } from "@angular/router";
import { CartService } from "app/cart/data-access/cart.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, CommonModule],
})
export class AppComponent implements OnInit {
  title = "ALTEN SHOP";
  cartItemCount = 0;

  constructor(private router: Router, private cartService: CartService) {}

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  ngOnInit() {
    this.cartService.cart$.subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }
}