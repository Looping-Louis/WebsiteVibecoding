import { Component } from '@angular/core';
import { PageShellComponent } from './layout/page-shell/page-shell.component';

@Component({
  selector: 'app-root',
  imports: [PageShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
