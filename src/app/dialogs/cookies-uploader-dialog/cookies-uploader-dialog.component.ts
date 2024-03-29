import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { PostsService } from 'app/posts.services';

@Component({
  selector: 'app-cookies-uploader-dialog',
  templateUrl: './cookies-uploader-dialog.component.html',
  styleUrls: ['./cookies-uploader-dialog.component.scss']
})
export class CookiesUploaderDialogComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];

  uploading = false;
  uploaded = false;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {

  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.uploading = false;
    this.uploaded = false;
  }

  uploadFile() {
    this.uploading = true;
    for (const droppedFile of this.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {          
          this.postsService.uploadCookiesFile(file, droppedFile.relativePath).subscribe(res => {
            this.uploading = false;
            if (res['success']) {
              this.uploaded = true;
              this.postsService.openSnackBar($localize`Cookies successfully uploaded!`);
            }
          }, err => {
            console.error(err);
            this.uploading = false;
          });
        });
      }
    }
  }

  public fileOver(event) {
  }

  public fileLeave(event) {
  }
}
