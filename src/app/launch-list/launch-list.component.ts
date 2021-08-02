import {Component, ChangeDetectionStrategy} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {ShipsListGQL} from '../services/spacexGraphql.service';
import {ActivatedRoute} from '@angular/router';
import {type} from "os";

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchListComponent {
  page = 1;
  port: Array<string> = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];
  type: Array<string> = ['Cargo', 'Barge', 'Tug', 'High Speed Craft'];
  selectedType = 'Cargo';
  name: any;
  shipsData = [];

  constructor(private readonly pastLaunchesService: ShipsListGQL) {
    this.pastLaunches$.subscribe(data => this.shipsData = data);
  }

  pastLaunches$ = this.pastLaunchesService
    .fetch({limit: 10})
    .pipe(map((res) => res.data.ships));

  changeRadioButton(value) {
    this.selectedType = value;
    this.shipsData = this.shipsData.filter(res => {
      return res.type.toLocaleLowerCase().match(this.selectedType.toLocaleLowerCase());
    });
  }

  Search() {
    if (this.name === "") {
      this.pastLaunches$.subscribe(data => this.shipsData = data);
    } else {
    this.shipsData = this.shipsData.filter(res => {
      return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
    });
    }
  }


}
