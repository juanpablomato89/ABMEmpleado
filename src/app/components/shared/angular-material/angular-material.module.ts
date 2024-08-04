import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material Modules
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatToolbarModule

  ], exports: [MatSliderModule, MatToolbarModule]
})
export class AngularMaterialModule { }
