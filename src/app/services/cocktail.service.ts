import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor(
    private http: HttpClient,

  ) { }

  getAllCategories(queryParams) {
    queryParams = queryParams == 2 ? 'c' : 'i';
    const url = `${this.baseUrl}/list.php`;
    return this.http.get(`${url}?${queryParams}=list`);
  }
  fetchListData(params, searchText) {
    let url = '';
    if (params === 's') {
      url = `${this.baseUrl}/search.php?${params}=${searchText}`;
    } else {
      url = `${this.baseUrl}/filter.php?${params}=${searchText}`;
    }

    return this.http.get(url);
  }

}
