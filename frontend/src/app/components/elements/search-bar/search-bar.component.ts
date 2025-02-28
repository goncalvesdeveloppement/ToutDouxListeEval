import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass']
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  searchQuery: string = '';

  onSearch() {
    this.search.emit(this.searchQuery);
  }
}
