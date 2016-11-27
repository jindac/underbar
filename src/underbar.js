(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
      return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
      if(n===0){
        return [];
      }
      else
        return n=== undefined ? array[array.length-1] : array.slice(-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
      if(Array.isArray(collection)){
        for (var i=0; i <collection.length; i++){
          iterator(collection[i], i, collection);
        }
      }
      else{
        for (var key in collection){
          iterator(collection[key], key, collection);
        }
      }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var newarray = [];

    _.each(collection, function(item) {
       if(test(item))
          newarray.push(item);
    })
    return newarray;
/*
    for(var i=0; i<collection.length; i++){
      if(test(collection[i]))
        newarray.push(collection[i]);

    }
    return newarray;
*/

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    //var newarray = [];
    return _.filter(collection, function(item){
      return !test(item);


    })
    /*
    var newarray =[];
    _.each(collection, function(item) {
       if(!test(item))
          newarray.push(item);
    })
    return newarray;
    */
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];
    _.each(array, function (value) {
      if (_.indexOf(result, value) === -1) {
        result.push(value);
      }
    })
    return result;
  };



  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {

    var newarray = [];
    _.each(collection, function(item){
      newarray.push(iterator(item));
    });
    return newarray;


    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  //                  [1,2,3]      [memo-item]  [10]
  _.reduce = function(collection, iterator, accumulator) {
    //if no starting value is passed, the first element is used as the accumulator
    //and is never passed to the iterator.
    //in case where a starting value is not passed, the iterator is not invoked until 2nd element
    //typeof accumulator == undefined
    var test = arguments.length === 2; //checks how many args are being passed and stores it as bool
    _.each(collection, function(param){
      if(test){
        accumulator = param;
        test = false; //after the first iteration, the test becomes false;
      }
      else
        accumulator = iterator(accumulator, param);
    })
    return accumulator;
    /*
      if(accumulator === undefined){
        accumulator = collection[0];
        for(var i=1; i<collection.length; i++){
           accumulator= iterator(accumulator, collection[i]);
        }
       }
      else{
      for(var i=0; i <collection.length; i++){

        accumulator= iterator(accumulator, collection[i])
      }
    }
    return accumulator; /hello
    */
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    iterator = iterator || _.identity;
    return _.reduce(collection, function(changingVal, val){
      if(iterator(val) && changingVal){
        return true;
      }
      else{
        return false;
      }
    }
    ,true);
    /*
    var truecount = 0;
    iterator = iterator || _.identity;
    _.each(collection, function(val){
      if(iterator(val) == true){
         truecount ++;
         //console.log(truecount);
         //console.log(val);
      }
    })
    if(truecount == collection.length){
      return true;
    } else {
      return false;
    }
*/
    //[1,2,3,4] function (val) { if(val >4) return true; else {return false}};
    //[false, false, false, true]


  //the elements pass a truth test. If no iterator is
  // provided, provide a default one
  };


  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    //iterate an array,
      //if one idex pass truthy,
        //return true
    iterator = iterator || _.identity;
    return !_.every(collection, function(val){
      return !iterator(val);
    })
    }

    /*
    iterator = iterator || _.identity;
    return _.every(collection, function(changingVal, val) {
      //if (changingVal)
      if (!iterator(val) && !changingVal) {
        return false;
      } else {
        return true;
      }
    })
  };
  */


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

  //_.extend({name: 'moe'}, {age: 50})
  //return {name:'moe', age:50}
  _.extend = function(obj) {
    //var flag = false;

    //({},{},{name:"derrick"})
    //console.log(Object.keys({}).length)
    _.each(arguments, function(argument, key, array){
      //if(argument !== {}){
      _.each(argument, function(value, key, object){
        obj[key] = object[key];
      });
      //}
    });
    return obj;
  };
  //_.extend( {name:"Derrick"} , [name:"Isaac"] ) // result = {name: "Isaac"}



  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  //_.extend({name: 'moe'}, {age: 50})
  //return {name:'moe', age:50}
  _.defaults = function(obj) {
    //should copy a property if that key is not already set on the target
    //should copy ANY property whose key is not already set on the target
    //should NOT copy any property whose key is already set on the target
    //should copy properties source an arbitrary number of source objects
    //should prefer the first value found when two objects are provided with properties of the same key
    _.each(arguments, function(argument, key, array) { //iterates through objects
      _.each(argument, function(value, key, object) { //iterates through keys of the current object
        if (!(key in obj)) { //if obj's key === object's key, then do something
          //obj[key] === undefined, not good in the case that key:undefined.
          obj[key] = object[key];
        };
        // var Isaac = { }
        // Isaac[name] = "Isaac"
        // var source (object)= {a: 1 , b: undefined}
        // source {a: 1}
        // var destination(obj) = {a: 10, b: 1 }
        // console.log(source[a]) //undefined
        // console.log(destination[a]) //10
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) { //once takes a function and puts it through a boolean
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() { //return a function
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    }; // var newFunction = function(param) {return 1}
    // console.log(newFunction())// function

    /*var add = _.once(function(x,y,z) {
          return x + y + z;
        });*/
    // add(1,2,3) // 6
  }; //var someFunction = function () {return 1}
  //console.log( someFunction ) //Function
  //someFunction();//1
  //function () {return something} ();


  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  /*beforeEach(function() {
        add = function(a, b) {
          return a + b;
        };

        memoAdd = _.memoize(add);
      });

  expect(memoAdd(1, 2)).to.equal(3); //memoAdd(1,2) = _.memoise(add(1,2)); // 3
        expect(memoAdd(3, 4)).to.equal(7); //memoAdd(3,4) = _.memoise(add(3,4)); // 7
        expect(memoAdd(1, 3)).to.equal(4); //memoAdd(1,3) = _.memoise(add(1,4)); // 4
  */

  //
  _.memoize = function(func) {
    //create boolean that checks to see if the parameter was inputted
    //fails(new paramter) then run the function and store para & result
    //true, then call the result based on parameter
    var storage = {};
    //var alreadyCalled = false;
    //var result;
    return function() { //([1,2,3]) vs (1,2,3)
      var argumentsArray = [...arguments]; //converts arguments into array // [[1,2,3]] vs [1,2,3]
      console.log("arguments = ",argumentsArray);
      return storage[argumentsArray.join('')] = storage[argumentsArray.join('')] || func.apply(this, arguments);
      //return storage[arguments.toString()];
    };
    /*_.once(function(func) {

      };
    });*/
    // 1. return function
    // 2. return function ();
  };





  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    var args = [...arguments];
    var argsSliced = args.slice(2);

    return window.setTimeout(function(){
      return func.apply(func, argsSliced);
    }, wait);
  };


  //.delay(a,b,c,d) != .delay
  //spy[1,2] = .delay(function){




  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    console.log("before:", array)
    //takes an array and randomize the index
    //how can we randomize indecies? -> it will retain array.length
    var currentI = array.length;
    var tempVal;
    var randomI;
    var result = [];
    _.each(array, function(item){
      result.push(item);
    });

    while(0 !== currentI){
      randomI = Math.floor(Math.random()*currentI);
      currentI --;
      tempVal = result[currentI];
      result[currentI] = result[randomI];
      result[randomI] = tempVal;

    }console.log("after:",array);
    return result;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
