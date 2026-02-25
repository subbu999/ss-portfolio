import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss']
})
export class ScrollTopComponent {

  showButton = false;
  scrollProgress = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {

    const scrollTop =
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    this.scrollProgress = (scrollTop / scrollHeight) * 100;

    this.showButton = scrollTop > 200;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
