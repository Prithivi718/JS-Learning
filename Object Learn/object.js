// Normal Object creation:
const obj = {
    name: "Prithivi",
    age: 19,
    sayHello: function () { console.log(`Hi it's ${this.name}`) },
    sayBye: () => { console.log(`Bye let's meet later!!`) }
}

console.log("Normal Object Creation")
obj.sayBye()
obj.sayHello()

obj_proto = Object.getPrototypeOf(obj);
console.log(`My object's prototype: ${obj_proto}`)


// Object Prototpe Chaining [Internal Behaviour]
function Animal() { this.name= "Dog"}
Animal.prototype.name = "Dog";
Animal.prototype.bark= ()=>  {console.log(`${Animal.prototype.name} barks!!`)}


dog = new Animal(); // "Woof"
console.log(dog.name);
dog.bark()
