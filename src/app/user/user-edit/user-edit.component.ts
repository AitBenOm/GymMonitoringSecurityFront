import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";

interface JsonImage {
  name: string;
  content: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  constructor(private userService: UserService, private sanitizer: DomSanitizer, private router: Router) {
  }

  user: UserModel;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = {percentage: 0};
  editPhoto: boolean ;
  avatar: SafeUrl = '';

  private readonly imageType: string = 'data:image/PNG;base64,';

  ngOnInit() {
    this.user = this.userService.getUserFromToken();
    this.userService.getFile().subscribe(
      (data: JsonImage) => {
        //  console.log(data.content);
        this.avatar = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content);

      }
    );
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.userService.saveFile(this.currentFileUpload).subscribe(
      (event: any) => {
        console.log(event);

        console.log('File is completely uploaded!');

        this.router.navigate(['user/profil']);

      });

    this.selectedFiles = undefined;
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.editPhoto=true;
  }
}
