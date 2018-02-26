import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {ProgramModel} from "../program/program-model";

@Pipe({
  name: 'filterByName'
})

export class FilterByNamePipe implements PipeTransform {

  transform(value: any, input: string, searchableList: any) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        let isTrue = false;

          if (el[searchableList].toLowerCase().indexOf(input) > -1) {
            isTrue = true;
          }
          if (isTrue) {
            return el
          }

      })
    }
    return value;
  }
}
