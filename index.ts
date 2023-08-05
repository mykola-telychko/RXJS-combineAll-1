import { take, map, combineAll } from 'rxjs/operators';
import { interval } from 'rxjs';

// explenation
// https://stackoverflow.com/questions/45181884/rxjs-combineall-operator-explanation

// emit every 1s, take 2
const timeInterval = 2000;
const qtyTake = 8;
const qtyElemInFinallArr = 3; // valOuter [arr per second] = qtyElemInFinallArr/timeInterval
const fnApplyToCombineAll = console.log;

// first .PIPE
const src$ = interval(timeInterval).pipe(take(qtyElemInFinallArr));

// second .PIPE

// map each emitted value from source to interval observable that takes 5 values
// src$.pipe ==> result$.pipe().subscribe()

const result$ = src$.pipe(
  map((valOuter) =>
    interval(timeInterval).pipe(
      map((valInner) => `Res el-(${valOuter}) : ${valInner}`),
      take(qtyTake)
    )
  )
);
/*
  2 values from source will map to 2 (inner) interval observables that emit every 1s
  combineAll uses combineLatest strategy, emitting the last value from each
  whenever either observable emits a value
*/

result$.pipe(combineAll()).subscribe(fnApplyToCombineAll); //++
/*  output:["Result (0): 0", "Result (1): 0"] */
