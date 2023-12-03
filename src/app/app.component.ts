import { Component } from '@angular/core';
import { faForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex';

  avisoInicial = true;

  icons: { [key: string]: any } = {
    'go': faForward,
  }
}
