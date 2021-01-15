'use strict';

/*
Задача:
Реализовать класс MyPromise, который будет работать точно так же как Promise.
Достаточно реализовать методы than(), catch(), finally().
Методы all(), race() реализлвывать не нужно.
*/

// Пример:

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(2);
//   }, 1000);
// });

// promise
//   .then((num) => {
//     return num *= 2;
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .then((num) => {
//     return num *= 3;
//   })
//   .finally(() => {
//     console.log('Finally');
//   });


// Реализация:

class MyPromise {
  constructor(callback) {
    this.onCatch = null;
    this.onFinally = null;
    this.thanCbs = [];
    this.isRejected = false;
    
    function resolver(data) {
      if (this.isRejected) {
        return;
      }

      this.thanCbs.forEach(cb => {
        data = cb(data);
      });
      
      if (this.onFinally) {
        this.onFinally();
      }
    }

    function rejecter(error) {
      this.isRejected = true;
      
      if (this.onCatch) {
        this.onCatch(error);
      }

      if (this.onFinally) {
        this.onFinally();
      }
    }

    callback(resolver.bind(this), rejecter.bind(this));
  }

  then(cb) {
    this.thanCbs.push(cb);
    return this;
  }

  catch(cb) {
    this.onCatch = cb;
    return this;
  }

  finally(cb) {
    this.onFinally = cb;
    return this;
  }
}

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // reject('Some error');
    resolve(10);
  }, 1000);
});

// console.log(promise);

promise
  .then((num) => {
    return num *= 2;
  })
  .catch((err) => {
    console.error(err);
  })
  .then((num) => {
    return num *= 3;
  })
  .finally(() => {
    console.log('Finally');
  })
  .then((num) => {
    console.log(num);
  });