import * as os from 'os';

// console.log(os.totalmem()); // 34358808576
console.log(os.freemem());

// console.log(os.cpus());

/**
 * os.cpus()
 * times.user、times.sys、times.idle 分别代表用户代码占用的 cpu 时间、系统代码占用的 cpu 时间，空闲的 cpu 时间
[
  {
    model: 'Intel(R) Xeon(R) Gold 6161 CPU @ 2.20GHz',
    speed: 2200,
    times: {
      user: 5686859,
      nice: 0,
      sys: 5486890,
      idle: 252922468,
      irq: 131265
    }
  },
  {
    model: 'Intel(R) Xeon(R) Gold 6161 CPU @ 2.20GHz',
    speed: 2200,
    times: {
      user: 3912890,
      nice: 0,
      sys: 3964984,
      idle: 256217890,
      irq: 22593
    }
  },
  {
    model: 'Intel(R) Xeon(R) Gold 6161 CPU @ 2.20GHz',
    speed: 2200,
    times: {
      user: 6530937,
      nice: 0,
      sys: 5506187,
      idle: 252058640,
      irq: 44453
    }
  },
  {
    model: 'Intel(R) Xeon(R) Gold 6161 CPU @ 2.20GHz',
    speed: 2200,
    times: {
      user: 4709093,
      nice: 0,
      sys: 2980437,
      idle: 256406234,
      irq: 28312
    }
  },
  {
    model: 'Intel(R) Xeon(R) Gold 6161 CPU @ 2.20GHz',
    speed: 2200,
    times: {
      user: 5754562,
      nice: 0,
      sys: 4171125,
      idle: 254170078,
      irq: 39078
    }
  },
  {
    model: 'Intel(R) Xeon(R) Gold 6161 CPU @ 2.20GHz',
    speed: 2200,
    times: {
      user: 4804453,
      nice: 0,
      sys: 3023375,
      idle: 256267937,
      irq: 28359
    }
  },
  {
    model: 'Intel(R) Xeon(R) Gold 6161 CPU @ 2.20GHz',
    speed: 2200,
    times: {
      user: 6251203,
      nice: 0,
      sys: 4167578,
      idle: 253676984,
      irq: 38218
    }
  },
  {
    model: 'Intel(R) Xeon(R) Gold 6161 CPU @ 2.20GHz',
    speed: 2200,
    times: {
      user: 5580562,
      nice: 0,
      sys: 3288890,
      idle: 255226312,
      irq: 29281
    }
  }
]
*/
