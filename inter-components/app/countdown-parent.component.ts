import {AfterViewInit, ViewChild} from 'angular2/core';
import {Component}                from 'angular2/core';
import {CountdownTimerComponent}  from './countdown-timer.component';


//// Local variable, #timer, version
@Component({
  selector:'countdown-parent-lv',
  template: `
  <h3>Countdown to Liftoff (via local variable)</h3>
  <button (click)="timer.start()">Start</button>
  <button (click)="timer.stop()">Stop</button>
  <div class="seconds">{{timer.seconds}}</div>
  <countdown-timer #timer></countdown-timer>
  `,
  directives: [CountdownTimerComponent],
  styleUrls: ['demo.css']
})
export class CountdownLocalVarParentComponent { }

//// View Child version
@Component({
  selector:'countdown-parent-vc',
  template: `
  <h3>Countdown to Liftoff (via ViewChild)</h3>
  <button (click)="start()">Start</button>
  <button (click)="stop()">Stop</button>
  <div class="seconds">{{ seconds() }}</div>
  <countdown-timer></countdown-timer>
  `,
  directives: [CountdownTimerComponent],
  styleUrls: ['demo.css']
})
export class CountdownViewChildParentComponent implements AfterViewInit {

  @ViewChild(CountdownTimerComponent)
  private _timerComponent:CountdownTimerComponent;

  seconds() { return 0; }

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.seconds = () => this._timerComponent.seconds, 0)
  }

  start(){ this._timerComponent.start(); }
  stop() { this._timerComponent.stop(); }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/