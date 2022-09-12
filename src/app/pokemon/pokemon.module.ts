import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonRoutingModule } from './pokemon-routing.module';
import { LetModule } from '@rx-angular/template';
import { PokemonComponent } from './pokemon.component';
import { PaginatorModule } from '../paginator/paginator.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes = [{ path: '', component: PokemonComponent }];

@NgModule({
  declarations: [PokemonComponent, ],
  imports: [CommonModule, LetModule, FormsModule,ReactiveFormsModule,RouterModule.forChild(routes), PaginatorModule, PokemonRoutingModule],
})
export class PokemonModule {}
