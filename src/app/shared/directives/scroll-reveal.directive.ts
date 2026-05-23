import { AfterViewInit, Directive, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';
import { AnimationService } from '../../core/services/animation.service';

@Directive({
  selector: '[appScrollReveal]'
})
export class ScrollRevealDirective implements AfterViewInit, OnDestroy {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly animationService = inject(AnimationService);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const nativeElement = this.element.nativeElement;
    this.renderer.addClass(nativeElement, 'reveal-ready');

    if (this.animationService.prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(nativeElement, 'reveal-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(nativeElement, 'reveal-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
    );

    this.observer.observe(nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
