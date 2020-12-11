import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { Resaturant } from '../restaurant';
import {ZonionsServService} from '../zonions-serv.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css'],
  providers:[ZonionsServService]
})
export class UpdateRestaurantComponent implements OnInit {
  resto:Resaturant;
  id:number;
  imagename:string;
  url:string;
  finalurl:string;
  file:any;
  constructor(private zonionsserve:ZonionsServService,private route: ActivatedRoute,private router: Router) { }
  ngOnInit(): void {
    this.resto=new Resaturant();
    this.id=this.route.snapshot.params['id'];
    console.log(this.id)
    this.zonionsserve.getRestoId(this.id).subscribe(data=>{
      console.log(data)
      this.resto=data;
      console.log("image name",this.resto.name);
      this.finalurl="http://localhost:8080/zonions/file";
      this.url=`${this.finalurl}/${this.resto.name}/${this.id}`;
      
        console.log(this.url);
    })
  }
  updateResto(){
    this.zonionsserve.update(this.id,this.resto).subscribe(data=>{
      console.log(data);
     // alert("Updated Successfully");
      this.resto=new Resaturant();
      this.gotoList();
    },error=>console.log(error)) 
  }
  onSubmit(){
    this.updateResto();
  }
  onChange(file){
      this.file=file;

  }
  updateImage(){
    console.log("I am in upload"+this.file);
    this.zonionsserve.pushFileToStorage(this.file,this.id).subscribe(resp=>{
      console.log(resp);
    
    },error=>console.log(error))
  }
  gotoList(){
    this.router.navigate(['restaurantList'])
  } 
  backEvent(){
    this.router.navigate(['admin']);

  }
}
