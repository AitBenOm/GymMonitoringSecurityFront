import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';
import {DomSanitizer} from "@angular/platform-browser";

interface JsonImage {
  name: string;
  content: string;
}

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {
  constructor(private userService: UserService, private sanitizer: DomSanitizer) {

  }

  user: UserModel;
  avatar: any;
  private readonly imageType: string = 'data:image/JPEG;base64,';

  ngOnInit() {
    this.user = this.userService.getUserFromToken();

    this.userService.getFile().subscribe(
      (data: JsonImage) => {
        //  console.log(data.content);
        this.avatar = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content);
        this.userService.avatarChanged.next(this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content));
      }
    );
  }

}
