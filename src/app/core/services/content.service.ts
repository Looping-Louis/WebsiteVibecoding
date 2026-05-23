import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  contactTopics,
  fineTuningComparison,
  HomeContent,
  homeContent,
  navigationItems,
  topicContent
} from '../../data/content';
import { ComparisonItem, NavigationItem, Topic, TopicId } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  getNavigation(): Observable<NavigationItem[]> {
    return of(navigationItems);
  }

  getHomeContent(): Observable<HomeContent> {
    return of(homeContent);
  }

  getTopic(id: TopicId): Observable<Topic> {
    return of(topicContent[id]);
  }

  getFineTuningComparison(): Observable<ComparisonItem[]> {
    return of(fineTuningComparison);
  }

  getContactTopics(): Observable<string[]> {
    return of(contactTopics);
  }
}
