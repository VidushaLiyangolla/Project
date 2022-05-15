import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const Material = [
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule
]

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }
