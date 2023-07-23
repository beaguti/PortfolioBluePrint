import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { CvService } from '../CV/cv.service';
import { ProjectService } from '../project/project.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private storage: AngularFireStorage,
    public afStore: AngularFirestore,
    private cvSV:CvService,
    private projSV:ProjectService,
  ) { }
  // Returns an observable
  async upload(file:any,type:any,ru:any,id:any){
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    let ruta=ru;
      let storageRef = this.storage.ref(`${ruta}/${file.name}.${type}`);
      let task=this.storage.upload(`${ruta}/${file.name}.${type}`,file);
      await task.snapshotChanges().pipe(finalize(()=>{
        let b=storageRef.getDownloadURL();
        if(b)
        b.subscribe((r)=>{
          if(ruta=="cv" && type=="jpg"){
              this.cvSV.editInfoIMG(id,r);
          }else if(ruta=="cv" && type=="pdf"){
            this.cvSV.editInfoPDF(id,r);
          }
          else if(ruta=="projects/colabs"){
            this.projSV.editColabIMG(id,r);
          }
          else if(ruta=="projects/proj"){
            this.projSV.editProjectIMG(id,r);
          }
        });
      })).subscribe(url=>{
      
      })
}

getImage(ruta:string,userId:any,id: string): any {
  let storageRef = this.storage.ref(`${userId}/${ruta}/${id}.jpg`);
  let a;
  let r=storageRef.getDownloadURL();
  return r.subscribe((res)=>{
    return res;
  });
  
}

delete(downloadUrl:any) {
  return this.storage.storage.refFromURL(downloadUrl).delete();
}

}
