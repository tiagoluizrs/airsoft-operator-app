import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollerService {

  constructor() { }

  async scrollFunction($event, func) {
    const scrollElement = await $event.target.getScrollElement();
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const currentScrollDepth = $event.detail.scrollTop;
    const targetPercent = 99.9;
    let triggerDepth = ((scrollHeight / 100) * targetPercent);

    func(currentScrollDepth, triggerDepth)
  }
}
