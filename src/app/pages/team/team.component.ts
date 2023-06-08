import { Component } from '@angular/core';

import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'tt-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

}
