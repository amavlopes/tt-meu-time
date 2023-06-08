import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '@app/core/services/auth.service';

@Component({
  selector: 'tt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  constructor(private auth: AuthService) { }

  logout() {
    this.auth.logout();
  }

}
