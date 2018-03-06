import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  constructor(private userService: UserService) {
  }

  user: UserModel;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  @ViewChild('fileInput') fileInput;

  ngOnInit() {
    this.user = this.userService.getUserFromToken();
  }

  // upload1() {
  //   this.progress.percentage = 0;
  //   this.currentFileUpload = this.selectedFiles.item(0);
  //
  //   const fileBrowser = this.fileInput.nativeElement;
  //   if (fileBrowser.files && fileBrowser.files[0]) {
  //     const formData = new FormData();
  //     formData.append("image", fileBrowser.files[0]);
  //     // this.projectService.upload(formData, this.project.id).subscribe(res => {
  //     console.log(formData.get('image'));
  //     // do stuff w/my uploaded file
  //     this.userService.saveFile(formData).subscribe(
  //       (data: any) => {
  //         console.log(data);
  //       }
  //     );
  //   }
  // }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.userService.pushFileToStorage(this.currentFileUpload).subscribe(
      (event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
}
