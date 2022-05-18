import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { UnityComponent } from './unity/unity.component';
import { UnityService } from './unity/unity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public position$: Observable<string>;

  constructor() {
    this.position$ = UnityService.REGISTRY['myMessage'].subject.asObservable();
  }
  
  @ViewChild('unity') unity: UnityComponent;
  public addDesk(): void {
    this.unity.instance.SendMessage('Director', 'addDesk');
  }
}
