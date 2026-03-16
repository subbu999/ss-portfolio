import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import { PreloaderService } from './components/pre-loader/preloader.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { JourneyComponent } from './components/journey/journey.component';
import { ExpertiseComponent } from './components/expertise/expertise.component';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { ContactComponent } from './components/contact/contact.component';
import { AchievementsComponent } from './components/achievements/achievements.component';
import { CertificationsComponent } from './components/certifications/certifications.component';
import { FooterComponent } from './components/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    PreLoaderComponent,
    NavbarComponent,
    ScrollTopComponent,
    HeroComponent,
    AboutComponent,
    JourneyComponent,
    ExpertiseComponent,
    ContactComponent,
    AchievementsComponent,
    CertificationsComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Sreekanth-Portfolio';
  constructor(public preloaderService:PreloaderService){}
  ngOnInit(): void {
    this.preloaderService.hide();
  }
}
