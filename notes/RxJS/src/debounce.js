import { fromEvent, throttleTime, debounceTime } from 'rxjs';

const clicks = fromEvent(document, 'click');

const resultthrottle = clicks.pipe(throttleTime(1000));
const resultdebounce = clicks.pipe(debounceTime(1000));

resultthrottle.subscribe((x) => console.log(x));
resultdebounce.subscribe((x) => console.log(x));
