import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'; 
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditArtComponent } from './edit-art.component';

@NgModule({
  declarations: [EditArtComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports:[EditArtComponent]
})
export class EditArtModule { }
