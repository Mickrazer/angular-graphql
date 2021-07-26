import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'searchName'
})

export class SearchPipe implements PipeTransform {
  transform(pastLaunches, value) {
    pastLaunches.filter(ship => {
      return ship.name.includes(value);
    });
  }
}
