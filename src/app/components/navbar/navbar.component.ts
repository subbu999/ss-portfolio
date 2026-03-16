import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports:[CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isScrolled = false;
  isMenuOpen = false;
  sections = ['home','about','journey','expertise','achievements','certifications','contact'];

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 100;
  }

  ngAfterViewInit(): void {
    const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const id = entry.target.getAttribute('id');

        document.querySelectorAll('.nav-link')
        .forEach(link => link.classList.remove('active'));

        const active = document.querySelector(`.nav-link[data-section="${id}"]`);

        active?.classList.add('active');

      }

    });

  }, {
    rootMargin: "-40% 0px -40% 0px"
  });

  sections.forEach(section => observer.observe(section));    
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}