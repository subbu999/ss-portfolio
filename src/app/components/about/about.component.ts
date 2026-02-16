import {
  Component,
  ElementRef,
  ViewChild,
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
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [
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
    animate('800ms cubic-bezier(.22,1,.36,1)')
  ])
]),
    // 🔹 Paragraph Animation
    trigger('paragraphAnim', [
      state('hidden', style({
        opacity: 0,
        transform: 'translate(-50px, 25px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translate(0,0)'
      })),
      transition('hidden => visible', [
        animate('750ms cubic-bezier(.22,1,.36,1)')
      ])
    ]),

    // 🔹 Card Animation
    trigger('cardAnim', [
      state('hidden', style({
        opacity: 0,
        transform: 'translate(0px, 30px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translate(0,0)'
      })),
      transition('hidden => visible', [
        animate('700ms cubic-bezier(.22,1,.36,1)')
      ])
    ])
  ]
})
export class AboutComponent implements AfterViewInit {

  @ViewChild('aboutSection') aboutSection!: ElementRef;

  @ViewChildren('paragraphEl') paragraphs!: QueryList<ElementRef>;
  @ViewChildren('cardEl') cards!: QueryList<ElementRef>;
  @ViewChildren('headingEl') headings!: QueryList<ElementRef>;

  headingVisibility: boolean[] = [];
  paragraphVisibility: boolean[] = [];
  cardVisibility: boolean[] = [];

  ngAfterViewInit(): void {

    // 🔹 Observe Headings Individually
this.headings.forEach((heading, index) => {

  this.headingVisibility[index] = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {

        setTimeout(() => {
          this.headingVisibility[index] = true;
        }, index * 250); // slower stagger for elegance

        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(heading.nativeElement);
});
    // 🔹 Observe Paragraphs Individually
    this.paragraphs.forEach((paragraph, index) => {

      this.paragraphVisibility[index] = false;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {

            setTimeout(() => {
              this.paragraphVisibility[index] = true;
            }, index * 180);

            observer.disconnect();
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(paragraph.nativeElement);
    });


    // 🔹 Observe Cards Individually
    this.cards.forEach((card, index) => {

      this.cardVisibility[index] = false;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {

            setTimeout(() => {
              this.cardVisibility[index] = true;
            }, index * 150);

            observer.disconnect();
          }
        },
        { threshold: 0.35 }
      );

      observer.observe(card.nativeElement);
    });
  }
}