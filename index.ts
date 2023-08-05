import { take, map, combineAll } from 'rxjs/operators';
import { interval } from 'rxjs';

// emit every 1s, take 2
const timeInterval = 2000;
const src$ = interval(timeInterval).pipe(take(2));
// map each emitted value from source to interval observable that takes 5 values
const result$ = src$.pipe(
  map((val) =>
    interval(timeInterval).pipe(
      map((i) => `Result (${val}): ${i}`),
      take(5)
    )
  )
);
/*
  2 values from source will map to 2 (inner) interval observables that emit every 1s
  combineAll uses combineLatest strategy, emitting the last value from each
  whenever either observable emits a value
*/

result$.pipe(combineAll()).subscribe(
  // console.log('----------------');
  console.log
); //++
/*  output:["Result (0): 0", "Result (1): 0"] */
