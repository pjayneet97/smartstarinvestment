import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isMenuCollapsed = true;
  email=this.authService.getEmail();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  isUser(){
    return this.authService.isAuthenticated()
  }
  logout(){
    this.authService.logOut()
  }

}

