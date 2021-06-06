import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { District } from './models/districts.model';
import { HomeService } from './home.service';
import { State } from './models/states.model';
import * as moment from 'moment';
import { Info } from './models/info.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.states = this.homeService.States;
  }

  @ViewChild('f') form: NgForm;

  states: State[] = [];
  districts: District[] = [];
  infos: Info[] = [];
  error: string;
  isSlotAvailable = true;
  filteredString: string = '';
  showFilter = false;

  onStateChange() {
    const id = this.form.value.state;
    this.homeService.onFetchDistrict(id).subscribe((response) => {
      this.districts = response;
    });
  }

  onSubmit() {
    this.isSlotAvailable = true;
    const distId = this.form.value.dists;
    let selectedDate = moment(this.form.value.date, 'YYYY-MM-DD').format('DD-MM-YYYY');

    this.homeService.onFetchSlots(distId, selectedDate).subscribe((response) => {
      this.infos = response;
      if (this.infos.length == 0) {
        this.isSlotAvailable = false;
        this.showFilter = false;
      } else {
        this.showFilter = true;
      }
    });
  }

  onReset() {
    this.form.reset();
    this.districts = [];
    this.infos = [];
    this.showFilter = false;
  }
}
