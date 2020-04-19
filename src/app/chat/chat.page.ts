import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  connection: signalR.HubConnection =  null;
  chatText = '';

  constructor() {}

  ngOnInit() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44367/chat', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection.on('receive', (data) => {
      console.log('Message Received', data);
    });

    this.connection
      .start()
      .then(() => {
        console.log('connection started');
      })
      .catch((error) => {
        console.log('error while connecting to chat hub');
      });
  }

  sendMessage() {
    this.connection.invoke('send', this.chatText);
  }
}
