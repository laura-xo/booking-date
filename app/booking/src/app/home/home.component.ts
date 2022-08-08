import { Booking } from './../Booking';
import { BookingsService } from './../bookings.service';
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public successMsg!: string;
  public errorMsg! : string;
  public date!: string;
  public name!: string;
  public email!: string;


  constructor(private bookingsService: BookingsService) { 
    
  }

  ngOnInit() {
  }

  createBooking () {

    this.bookingsService.createBooking(this.date, this.name, this.email)
    .subscribe((createdBooking: Booking) =>{
      const bookingDate = new Date(this.date).toLocaleDateString();
      this.successMsg=`Booking was successfully made for ${bookingDate}!`
      
      this.date='';
      this.name='';
      this.email='';

    },
    (error:ErrorEvent) =>{
      this.errorMsg = error.message
    })
    
  }

}
