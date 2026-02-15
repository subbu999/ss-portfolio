import {
  Component,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  style,
  state,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './journey.component.html',
  styleUrl: './journey.component.scss',
  animations: [

    trigger('slideUpAnim', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(70px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('850ms cubic-bezier(.22,1,.36,1)')
      ])
    ]),

    trigger('dotAnim', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.6)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden => visible', [
        animate('500ms ease-out')
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
export class JourneyComponent implements AfterViewInit {

  @ViewChildren('journeyItem') items!: QueryList<ElementRef>;
  @ViewChildren('headingEl') headings!: QueryList<ElementRef>;

  itemVisibility: boolean[] = [];
  headingVisibility: boolean[] = [];

  ngAfterViewInit(): void {

    this.items.forEach((item, index) => {

      this.itemVisibility[index] = false;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {

            setTimeout(() => {
              this.itemVisibility[index] = true;
            }, 120);

            observer.disconnect();
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(item.nativeElement);
    });

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
