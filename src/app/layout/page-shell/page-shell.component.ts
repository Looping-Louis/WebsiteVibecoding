import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { AnimatedBackgroundComponent } from '../../shared/components/animated-background/animated-background.component';
import { ScrollProgressComponent } from '../../shared/components/scroll-progress/scroll-progress.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-page-shell',
  imports: [
    RouterOutlet,
    AnimatedBackgroundComponent,
    ScrollProgressComponent,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './page-shell.component.html',
  styleUrl: './page-shell.component.scss',
  animations: [
    trigger('routeFade', [
      transition('* <=> *', [
        style({ opacity: 0, transform: 'translateY(14px)' }),
        animate('260ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class PageShellComponent {
  routeAnimation(outlet: RouterOutlet): string {
    return outlet.activatedRouteData?.['animation'] ?? 'default';
  }
}
