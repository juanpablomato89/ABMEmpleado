import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material Modules
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule

  ], exports: [
    MatSliderModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AngularMaterialModule { }
