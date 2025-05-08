### **1. What is the `keyof` Keyword in TypeScript?**

The `keyof` keyword in TypeScript is used to **get the keys (property names)** of an object type as a **union of string literals**. It’s super useful when you want to work with the property names of an object in a type-safe way.

#### **Simple Explanation**
Imagine you have an object type, like a person with properties `name`, `age`, and `city`. Using `keyof` on this type gives you a type that represents all the property names: `"name" | "age" | "city"`. This helps you ensure that you only use valid property names when accessing or manipulating the object.

#### **Example**
```typescript
interface Person {
    name: string;
    age: number;
    city: string;
}

// Using keyof to get the keys of Person
type PersonKeys = keyof Person; // "name" | "age" | "city"

// Function that takes a key of Person and returns its value
function getProperty(obj: Person, key: keyof Person): string | number {
    return obj[key];
}

const person: Person = {
    name: "Alice",
    age: 25,
    city: "New York"
};

console.log(getProperty(person, "name")); // Output: Alice
console.log(getProperty(person, "age"));  // Output: 25
// console.log(getProperty(person, "email")); // Error: "email" is not a key of Person
```

#### **Explanation of Example**
- `interface Person`: Defines an object type with properties `name`, `age`, and `city`.
- `keyof Person`: Creates a type `PersonKeys` that is `"name" | "age" | "city"`.
- The `getProperty` function takes a `Person` object and a `key` (which must be one of the keys of `Person`). It safely accesses the property using `obj[key]`.
- If you try to use a key that doesn’t exist (like `"email"`), TypeScript will show an error, keeping your code safe.

#### **Use of `keyof`**
- Ensures type safety when working with object properties.
- Useful in scenarios like creating utility functions, mapping over object keys, or enforcing valid property names.
- Commonly used with **index signatures** or **mapped types**.

---

### **2. Difference Between `any`, `unknown`, and `never` Types**

These are three special types in TypeScript, and they behave differently. Let’s break them down with simple explanations and examples.

#### **a. `any` Type**
- **What is it?**: The `any` type is like saying, “This can be anything, and TypeScript won’t check it.” It turns off type checking for that variable, so you can do whatever you want with it.
- **When to use?**: When you don’t know the type or want to temporarily avoid type checking (not recommended, as it loses TypeScript’s benefits).
- **Risk**: It’s unsafe because TypeScript won’t catch errors, even if you make mistakes.

#### **Example of `any`**
```typescript
let value: any;

value = "Hello"; // OK
value = 42;      // OK
value = true;    // OK

console.log(value.toUpperCase()); // Works if value is a string, but no error if it’s not
value.push(100); // No error, even if value is not an array
```

**Problem**: If `value` is not a string, `value.toUpperCase()` will crash at runtime, but TypeScript won’t warn you because `any` skips type checking.

---

#### **b. `unknown` Type**
- **What is it?**: The `unknown` type is like saying, “I don’t know the type, but you need to check it before using it.” It’s safer than `any` because TypeScript forces you to narrow down the type (e.g., using `typeof` or type assertions) before performing operations.
- **When to use?**: When you’re dealing with data from an unknown source (e.g., API responses, user input) and want to stay type-safe.
- **Benefit**: Prevents runtime errors by requiring type checks.

#### **Example of `unknown`**
```typescript
let value: unknown;

value = "Hello"; // OK
value = 42;      // OK

// console.log(value.toUpperCase()); // Error: TypeScript doesn’t know if value is a string

if (typeof value === "string") {
    console.log(value.toUpperCase()); // OK: TypeScript knows value is a string
} else if (typeof value === "number") {
    console.log(value * 2); // OK: TypeScript knows value is a number
}
```

**Explanation**: You can assign anything to `unknown`, but you must check its type (e.g., with `typeof`) before using it. This makes `unknown` safer than `any`.

---

#### **c. `never` Type**
- **What is it?**: The `never` type represents something that **never happens**. It’s used for functions that never return (e.g., they throw an error or run forever) or for impossible type scenarios.
- **When to use?**: In functions that always throw errors, have infinite loops, or in type narrowing when no value is possible.
- **Key Point**: A `never` type can’t hold any value—not even `null` or `undefined`.

#### **Example of `never`**
```typescript
// Function that always throws an error
function throwError(message: string): never {
    throw new Error(message);
}

// Function with infinite loop
function infiniteLoop(): never {
    while (true) {
        console.log("Running forever...");
    }
}

// Example with type narrowing
function getValue(value: string | number): number {
    if (typeof value === "string") {
        return value.length;
    } else if (typeof value === "number") {
        return value * 2;
    }
    // If we reach here, value is never (impossible)
    throwError("Invalid type"); // never
}

console.log(getValue("hello")); // 5
console.log(getValue(10));      // 20
console.log(throwError("Oops")); // Throws error
```

**Explanation**:
- `throwError`: Never returns because it always throws an error, so its return type is `never`.
- `infiniteLoop`: Never returns because it runs forever, so its return type is `never`.
- In `getValue`, the `throwError` case is typed as `never` because it’s impossible for `value` to be anything other than `string` or `number` (due to type narrowing).

---

### **Key Differences: `any`, `unknown`, `never`**

| **Type**   | **Description**                              | **Safety**         | **Use Case**                              | **Example**                          |
|------------|---------------------------------------------|--------------------|------------------------------------------|--------------------------------------|
| `any`      | Can be anything, no type checking.          | Unsafe             | Quick prototyping, unknown types (avoid).| `let x: any = 5; x.push(10);`       |
| `unknown`  | Can be anything, but requires type checking.| Safe               | Unknown data (e.g., API, user input).    | `let x: unknown; if (typeof x === "string") x.toUpperCase();` |
| `never`    | Represents something that never happens.    | Safe (no value)    | Functions that never return, type narrowing. | `function throwError(): never { throw new Error(); }` |

---

### **Combined Example**
Here’s a single example that uses all three types to show their differences:

```typescript
function processData(data: unknown): string {
    // Handle unknown type
    if (typeof data === "string") {
        return data.toUpperCase(); // Safe after type check
    } else if (typeof data === "number") {
        return (data * 2).toString(); // Convert number to string
    } else {
        // This case is impossible (never)
        throw new Error("Invalid data type"); // never
    }
}

let anything: any = "hello";
console.log(anything.toUpperCase()); // Works, but unsafe if anything is not a string

let unknownData: unknown = 10;
console.log(processData(unknownData)); // Output: "20"

function alwaysFail(): never {
    throw new Error("This never returns");
}

try {
    alwaysFail(); // Will throw error
} catch (e) {
    console.log(e); // Error: This never returns
}
```

**Output**:
```
HELLO
20
Error: This never returns
```

**Explanation**:
- `any`: No type safety, so `anything.toUpperCase()` works without checks.
- `unknown`: Requires type checking in `processData` to safely handle `unknownData`.
- `never`: `alwaysFail` never returns, so it’s typed as `never`.

---
