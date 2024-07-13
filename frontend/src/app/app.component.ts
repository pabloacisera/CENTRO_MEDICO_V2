import { Component, Inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'centro medico - MEDILINK - software';

  constructor(private route: Router){}

  accederARegistro(){
    this.route.navigate(['/registro'])
  }
  accederALogeo(){
    this.route.navigate(['/logear'])
  }
}
