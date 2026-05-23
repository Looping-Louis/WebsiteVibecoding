import { Injectable } from '@angular/core';
import { fromEvent, map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private readonly reducedMotionQuery =
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  prefersReducedMotion(): boolean {
    return this.reducedMotionQuery?.matches ?? false;
  }

  watchReducedMotion(): Observable<boolean> {
    if (!this.reducedMotionQuery) {
      return new Observable<boolean>((subscriber) => {
        subscriber.next(false);
        subscriber.complete();
      });
    }

    return fromEvent<MediaQueryListEvent>(this.reducedMotionQuery, 'change').pipe(
      map((event) => event.matches),
      startWith(this.reducedMotionQuery.matches)
    );
  }
}
