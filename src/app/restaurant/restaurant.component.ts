import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Resaturant } from '../restaurant';
import {ZonionsServService} from '../zonions-serv.service'

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  providers:[ZonionsServService]
})
export class RestaurantComponent implements OnInit {
  restaurantForm:FormGroup;
  isSubmitted:true;
  data:any;
  file:any;
  restaurantId:any;
  ismeridian: boolean = false;
  showSpinners = true;
  restaurantData:any;
  constructor(private zonionsserve:ZonionsServService,private router:Router) { 
    this.restaurantForm=new FormGroup({
      restaurantName:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('([a-zA-Z0-9])+')
      ])),
      address:new FormControl('',Validators.compose([
        Validators.required
      ])),
      phone_no:new FormControl('',Validators.compose([
        Validators.required,
        Validators.pattern('[7-9][0-9]{9}')
      ])),
      open_time:new FormControl(''),
      close_time:new FormControl(''),
      updated_date:new FormControl('')
    })
  }
  ngOnInit(): void {
  }
  saveRestaurant(fvalue){
    console.log(this.restaurantForm.value);
    this.data=fvalue;
    console.log(this.data)
    this.isSubmitted=true;
    this.zonionsserve.createRestaurant(this.restaurantForm.value).subscribe(res=>{
      console.log("after adding resto",res)
     this.restaurantData=res;
     console.log("id from restaurant data",this.restaurantData.id)
     //this.restaurantId=this.restaurantData.id;
     //this.restaurantId
     // alert("added successfully");
     this.router.navigate(['restaurantList']);
    },error=>console.log(error))
    
  }
  uploadFile(){
    console.log("I am in upload"+this.file);
    this.zonionsserve.pushFileToStorage(this.file,this.restaurantData.id).subscribe(resp=>{
      console.log(resp)
    },error=>console.log(error))
  }
  onFileChangeEvent(file){
      this.file=file;
      console.log("file change event=",this.file)
  }

  restaurantName_validation_message={
    'restaurantName':[
      { type: 'required', message: 'Username is required' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters' }
    ]
  }
  address_validation_message={
    'address':[
      {type:'required',message:'Address is required'}
    ]
  }
  phone_no_validation_message={
    'phone_no':[
      {type:'required',message:'phone number is required'},
      {type:'pattern',message:'phone should be start with 7/8/9 and should be 10 digit'}
    ]
  }
  backEvent(){
    this.router.navigate(['admin']);

  }

}
