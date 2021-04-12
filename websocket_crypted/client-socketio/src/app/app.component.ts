import { Component } from '@angular/core';
import { SocketService } from './socket.service';
import { CesarService } from './cesar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messageList:  string[] = [];


  constructor(
    private socketService: SocketService,
    private cesarService: CesarService) {
  }


    sendMessage(message: HTMLInputElement) {

    let encoded = this.cesarService.encode(message.value, 10);
    this.socketService.sendMessage(encoded);
    //console.log("sent: " + message.value)
    message.value="";
  }
  ngOnInit() {
    this.socketService.getMessage()
      .subscribe((message: string) => {
        this.messageList.push(message);
        console.log("messagereceived: " + message)
      });
  }
}
