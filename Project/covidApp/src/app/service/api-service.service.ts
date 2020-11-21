import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { map ,tap} from 'rxjs/operators';
import { Observable,of } from 'rxjs';
 

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }


  
getDataFromServer(url:string, pathVariable:string,optionalParam:any){
  let options:any= {
             params: optionalParam,
          }
 
       return this.http.get<any>(url)
           .pipe(map(response => {
             console.log(response)
               return response;
           }));
       };
 
         public getFile(url:string, pathVariable:string,optionalParam:any): Observable<Blob> {
   return this.http
     .get(url, {
       responseType: "blob"
     });
 }

}