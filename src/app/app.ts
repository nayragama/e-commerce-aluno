import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Header } from './shared/layout/header/header';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce-aluno');
  nomeLoja = 'Loja Da Nayra';
}
