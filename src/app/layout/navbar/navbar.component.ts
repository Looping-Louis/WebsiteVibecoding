import { AsyncPipe } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('mobileMenu', [
      state('closed', style({ opacity: 0, transform: 'translateY(-10px)', pointerEvents: 'none' })),
      state('open', style({ opacity: 1, transform: 'translateY(0)', pointerEvents: 'auto' })),
      transition('closed <=> open', animate('180ms ease-out'))
    ])
  ]
})
export class NavbarComponent {
  private readonly contentService = inject(ContentService);

  readonly navigation$ = this.contentService.getNavigation();
  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
