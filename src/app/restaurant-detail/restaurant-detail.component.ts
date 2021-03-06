import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ZonionsServService } from '../zonions-serv.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurantDetail:Observable<any[]>
  restaurantList:any
  url:string;
  finalurl:string
  constructor(private zonionsserve:ZonionsServService,private activated_route:ActivatedRoute) { }

  ngOnInit(): void {
    let restoName=this.activated_route.snapshot.params['restaurantName'];
    console.log(restoName)
    this.zonionsserve.getRestaurantList().subscribe(data=>{
        console.log(data.length)
        this.restaurantDetail=data
        console.log(this.restaurantDetail)
        for(let i=0;i<data.length;i++){
          if(data[i].restaurantName===restoName){
            this.restaurantList=data[i]
          }
        }
        console.log(this.restaurantList.name)
        console.log(this.restaurantList.id)
        
    this.finalurl="http://localhost:8080/zonions/file";
    this.url=`${this.finalurl}/${this.restaurantList.name}/${this.restaurantList.id}`;
    
    console.log(this.url)

    });    
    }
    
}
