import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  username: string | null = '';

  private router = inject(Router);

  ngOnInit() {
    
    this.username = localStorage.getItem('username');
  }

  logOut() {
     localStorage.removeItem('username');
    this.router.navigateByUrl(``);
  }
}
