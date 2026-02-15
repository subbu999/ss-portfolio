import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [
    trigger('fadeScale', [
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.9)'
      })),
      transition('visible <=> hidden', animate('400ms ease-in-out'))
    ]),
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    //  Heading animation
    trigger('headingAnim', [
  state('hidden', style({
    opacity: 0,
    transform: 'translateY(15px)'
  })),
  state('visible', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  transition('hidden => visible', [
    animate('{{delay}}ms cubic-bezier(.22,1,.36,1)')
  ], { params: { delay: 600 } })
])
  ]
})
export class HeroComponent {

  imageVisible = true;

  @HostListener('window:scroll')
  @ViewChildren('headingEl') headings!: QueryList<ElementRef>;
  headingVisibility: boolean[] = [];
  onScroll() {
    this.imageVisible = window.scrollY < 120;
  }
  ngAfterViewInit(): void {   

    this.headings.forEach((item, index) => {

      this.headingVisibility[index] = false;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {

            setTimeout(() => {
              this.headingVisibility[index] = true;
            }, 120);

            observer.disconnect();
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(item.nativeElement);
    });
  }
}
