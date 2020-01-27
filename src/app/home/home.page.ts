import { Component } from '@angular/core';
import * as aurorajs from 'aurorajs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {

		let ad = new aurorajs.Device('10.0.0.200', 2872);

		ad.connectedState()
		.filter(state=>state)
		.subscribe((s)=>{
		    ad.sendCommand('REQUEST_CONTROL', {password: 'aurora'});
		    ad.sendCommand('GET_SYSTEM_INFO');
		});

		ad.getResponsesForCommand('REQUEST_CONTROL').subscribe(()=>{
		    console.log('Request Control');
		});

		ad.getResponsesForCommand('GET_AVAILABLE_PATTERNS').subscribe((command)=>{
		    console.log('Patterns: ', command);
		});

		ad.getErrors().subscribe((command)=>{
		    console.log('Errors!: ', command);
		});

		ad.controlState().subscribe((state)=>{
		    console.log('Control state: ', state);
		});

		ad.connectedState().subscribe((state)=>{
		    console.log('Connection state: ', state);
		});

		ad.getCommandResponses().subscribe((raw)=>{
		    console.log('Command Responses ', raw);
		});

		ad.getNotifications().subscribe((raw)=>{
		    console.log('Notifications ', raw);
		});
  }

}
