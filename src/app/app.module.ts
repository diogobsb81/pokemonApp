import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { PokemonStateService } from './pokemon/pokemon-state.service';
import { LetModule } from '@rx-angular/template';


@NgModule({
  declarations: [AppComponent, HeaderComponent ],
  imports: [BrowserAnimationsModule, LetModule ,ReactiveFormsModule ,PokemonModule,FormsModule,BrowserModule, HttpClientModule ,NgxNavbarModule,AppRoutingModule],
  providers: [PokemonStateService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
