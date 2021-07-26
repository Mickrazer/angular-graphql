import {Component, ChangeDetectionStrategy} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {ShipsListGQL} from '../services/spacexGraphql.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaunchListComponent {
  page = 1;
  cargo = 'Cargo';
  port: Array<string> = ['Port Canaveral', 'Port of Los Angeles', 'Fort Lauderdale'];

  constructor(private readonly pastLaunchesService: ShipsListGQL) {
  }

  pastLaunches$ = this.pastLaunchesService
    .fetch({limit: 10})
    .pipe(map((res) => res.data.ships));

  // searchShipsByType(type){
  //   this.pastLaunchesService.fetch({find: type}).pipe(map(type));
  // }
}
