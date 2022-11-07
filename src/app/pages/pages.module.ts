import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";

import { IndexComponent } from "./index/index.component";
import { RegisterpageComponent } from "./app-event/registerpage/registerpage.component";
import { EventListComponent } from "./app-event/eventslist/event.list.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {NgxQRCodeModule} from "@techiediaries/ngx-qrcode";
import {NgxQrcodeStylingModule} from "ngx-qrcode-styling";

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule,
        BsDropdownModule.forRoot(),
        ProgressbarModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        CollapseModule.forRoot(),
        JwBootstrapSwitchNg2Module,
        TabsModule.forRoot(),
        PaginationModule.forRoot(),
        AlertModule.forRoot(),
        BsDatepickerModule.forRoot(),
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
        MatDatepickerModule,
        NgxQRCodeModule,
        NgxQrcodeStylingModule
    ],
  declarations: [
    IndexComponent,
    RegisterpageComponent,
    EventListComponent
  ],
  exports: [
    IndexComponent,
    RegisterpageComponent,
    EventListComponent
  ],
  providers: []
})
export class PagesModule {}
