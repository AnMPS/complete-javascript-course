'use strict';

//constructor functions

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

//prototypes: methods

Person.prototype.calcAge = function () {
  return 2037 - this.birthYear;
};

const jonas = new Person('Jonas', 1991);

console.log(jonas instanceof Person);

console.log(jonas.calcAge());

console.log(jonas.__proto__ == Person.prototype);

Person.prototype.species = 'Homo sapiens';

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //this method will be on the prototype of the object, new methods can also be added with object.prototype
  calcAge() {
    return 2037 - this.birthYear;
  }
  get age() {
    return 2037 - this.birthYear;
  }
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
      //trying to set the fullName directly or reuse it will call the method and make a loop
    } else alert(`${name} is not a full name!`);
  }
  //needs a getter
  get fullName() {
    return this._fullName;
  }

  //static method

  static hey() {
    console.log('Hey there!');
  }
}

// const jessica = new PersonCl('Jessica', 1996); //error not a full name
// console.log(jessica.age);
// jessica.fullName = 'Jessica Davis'; //will set full name property now

//set, get
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],
  get latest() {
    return this.movements.slice(-1).pop;
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
console.log(account.latest);
account.latest = 50;

//static methods, not inherited in prototype, only in the Person class constructor.
Person.hey = function () {
  console.log('Hey there!');
};

Person.hey();

//Object.create, manually set prototype of object to any object

const PersonProto = {
  calcAge() {
    return 2037 - this.birthYear;
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

//inhertance between classes

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
//must be right after class declarationm linking prototypes
Student.prototype = Object.create(Person.prototype);
//Sets prototype back to Student so it can extend instead
Student.prototype.constructor = Student;

Student.prototype.greet = function () {
  console.log(`My name is ${this.firstName}, I study ${this.course}`);
};

const mike = new Student('mike', 1991, 'CS');
mike.greet();

//using classes
class StudentCL extends Person {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear); //constructs parent class, creates this keyword
    this.course = course;
  }
  greet() {
    console.log(`My name is ${this.fullName}, I study ${this.course}`);
  }
}
const martha = new StudentCL('Martha Jones', 2012, 'CS');

//using object create

const steven = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
const jay = Object.create(StudentProto);

class Account {
  locale = navigator.locale;
  bank = 'Bankist';
  #movements = []; //private
  #pin; //private
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin; //private set
    console.log(`Thanks for opening an account, ${owner}`);
  }
  deposit(val) {
    this.#movements.push(val);
  }
  withdraw(val) {
    this.#movements.push(-val);
  }

  #approvedLoan(val) {
    return true;
  }
  requestLoan(val) {
    if (this.#approvedLoan(val)) {
      this.deposit(val);
    }
  }
  static test() {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
