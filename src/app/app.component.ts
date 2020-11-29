import { Component, OnInit } from '@angular/core';
import { CocktailService } from './services/cocktail.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  listData: any;
  form;
  selectedFilter = 1;
  filterList: any;
  inDebounce: any;
  loader = true;
  constructor(
    private cocktail: CocktailService,
    private fb: FormBuilder

  ) { }
  ngOnInit() {
    this.form = this.fb.group({
      name: ['',],
      type: ['1',],
      categorylist: ['',],
      ingredientlist: ['',]
    });
    this.fetchAutoSuggestionsApi();

  }

  setFilter(event) {
    this.selectedFilter = event.value;
    if (event.value == 2) {
      this.getCategoryList(this.selectedFilter);
    } else if (event.value == 3) {
      this.getCategoryList(this.selectedFilter);
    }
    if (this.selectedFilter) {
      this.fetchAutoSuggestionsApi();
    }
  }

  getCategoryList(params) {
    this.loader = true;
    this.cocktail.getAllCategories(params).subscribe((res: any) => {
      if (res) {
        this.filterList = res.drinks;
      }
      this.loader = false;

    })
  }


  getDataBased(params, searchText) {
    this.loader = true;
    this.cocktail.fetchListData(params, searchText).subscribe((res: any) => {
      this.listData = []
      if (res) {
        this.listData = res.drinks || [];
      }
      this.loader = false;
    })
  }
  // Debounce functionality
  fetchAutoSuggestions(event) {
    const self = this;
    if (this.inDebounce) {
      clearTimeout(this.inDebounce);
    }
    this.inDebounce = setTimeout(() => { self.fetchAutoSuggestionsApi(); }, 1000);
  }
  fetchAutoSuggestionsApi() {
    const text = this.form.value.name;
    this.selectedFilter = this.form.value.type;
    const categoryName = this.form.value.categorylist;
    const ingredientName = this.form.value.ingredientlist;
    switch (this.form.value.type) {
      case '1':
        this.getDataBased('s', text);
        break;
      case '2':
        this.getDataBased('c', categoryName);
        break;
      case '3':
        this.getDataBased('i', ingredientName);
        break;

    }
  }


}

