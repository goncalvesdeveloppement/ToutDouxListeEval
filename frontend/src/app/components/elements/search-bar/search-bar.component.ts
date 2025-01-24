import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent implements OnInit {
  searchByKeyword: string = '';
  @Output() eventEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onSearchByKeyword() {
    this.eventEmitter.emit(this.searchByKeyword);
  }
}
