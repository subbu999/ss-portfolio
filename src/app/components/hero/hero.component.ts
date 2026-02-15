import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
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

  experienceCount = 0;
  projectsCount = 0;
  teamsLeadingCount=0;
  @ViewChild('statsBlock') statsBlock!:ElementRef;
  private observer!:IntersectionObserver;
  private hasAnimated = false;
  private isAnimating = false;
  private hasEntered = false;

  imageVisible = true;
  

  @HostListener('window:scroll')
  @ViewChildren('headingEl') headings!: QueryList<ElementRef>;
  headingVisibility: boolean[] = [];
  onScroll() {
    this.imageVisible = window.scrollY < 120;
  }
  ngAfterViewInit(): void {   

    if (!this.statsBlock) return;
    this.observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting && !this.isAnimating) {
      this.isAnimating = true;

      this.animateCounter('experience', 16, 1000);
      this.animateCounter('projects', 135, 1000);
      this.animateCounter('teams', 8, 1000);
    }
    

    if (!entry.isIntersecting) {
      this.isAnimating = false;
      this.experienceCount = 0;
      this.projectsCount = 0;
      this.teamsLeadingCount=0;
    }
  },
  { threshold: 0.4 }
);
    this.observer.observe(this.statsBlock.nativeElement);

    

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
  private animateCounter(
    type: 'experience' | 'projects' | 'teams',
    target: number,
    duration: number
  ) {
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * target);

      if (type === 'experience') {
        this.experienceCount = value;
      }
      if(type==='projects') {
        this.projectsCount = value;
      }
      if(type==='teams') {
        this.teamsLeadingCount = value;
      }


      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);

  }
  ngOnDestroy(): void {
    this.observer?.disconnect();
    }
}
