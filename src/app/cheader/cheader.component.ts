import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cheader',
  templateUrl: './cheader.component.html',
  styleUrl: './cheader.component.css',
  standalone: false
})
export class CheaderComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  userRole: string[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        const token = localStorage.getItem('token');
        if (token) {
          this.userRole = this.authService.getRoles(token);
        }
      } else {
        this.userRole = [];
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

  isUserRole(role: string): boolean {
    return this.userRole.includes(role);
  }

  logout() {
    this.authService.logout(); 
    this.isLoggedIn = false; 
    this.router.navigate(['/login']);
  }
}