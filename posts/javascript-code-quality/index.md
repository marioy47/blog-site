## What is code Quality?

- People should understand how and why the sofware does
- The challange is to communicate intent and goals
- Humans adapt and respond to mistakes
- Computers do not adapt when there is a mistake
- Improve communication between softwware engeneeris and computers

## What is coding standarsd

- Coding convention is a set of guidelines for a language
  - Programming style: code readability
  - Practices: how to build and architect
  - Methods: How to plan an implement
- A coding standard is a collection of coding conventions
- The codigin standard is designed to produce quality code
- Formally accepted by a group or project
- Programming style conventions include:
  - Comments
  - Usage of whitespace
  - Naming of variables, methods and clases
  - Possible errors as unreachable code
  - Spelling
  - Security
  - Translation

## Enforcing an standandard

- Using a linter
- A linter is a tool that scan code to look for suspicion usage as syntax errors
  - Uses static analisis
  - Are configured with rules

## Unit Testing

- Unit is the smallest part of an application
- It could be a class, a method or a module depending on the type of development
- The are performed in memomoy (no definitive changes)
- Safe to run
- Are fasts
- Are made up of assersions: Statement that a predicate is going to be true or false
-

```javascript
// Use the native `assert` module
const assert = require("assert")

// Funtion to test
function dog() {
  return "bark"
}

// Assertion. First the actual and then the expected
assert.equal(dog(), "jump")
```

```bash
$ node assert.js
node:assert:123
  throw new AssertionError(obj);
  ^

AssertionError [ERR_ASSERTION]: 'bark' == 'jump'
    at Object.<anonymous> (/Users/mario/Downloads/assert.js:7:8)
    at Module._compile (node:internal/modules/cjs/loader:1095:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1124:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:816:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:79:12)
    at node:internal/main/run_main_module:17:47 {
  generatedMessage: true,
  code: 'ERR_ASSERTION',
  actual: 'bark',
  expected: 'jump',
  operator: '=='
}
```

## Integration Testing

- Builds uppon unit test
- Combines units and tests the results in combinantios
- API, UI and Query results
- Uses the full of partial environment
- More complex and harder to mantina
- Uses the same tools as unit testing
-

## function Testing

- It focuses on the result and not the code
- Checks for a specific feature
- Typically is automated, but manual is also an option
- They are slower to execute
- Reads more like a script:

```markdown
1. An anonymous user visits the front page
2. Click on the reservation link
3. Sees "Book Table" on page
4. Enters email, time
5. Clicks on the reserve button
```

## System testing

- Uses the complete system
- Some are for performance testing
- Usability
- Test compability

## Regresion testing

- To find bugs in the software
- Features fail after a change

## Test automation

- Separate software from the application
- Controls order and filtering of tests
- Avoids repetitive tasks
- Helps with a consisten definition of how assertions are defined
- Reports the results
- Helps with the setup of the environment
- Test data
- Execution control like susbsets of tests or tresholds

## Tests phases in a framework

- Setup
  - Module inclusion
  - Dependencies replacement
  - Data load
- Execution
  - Call the methods
  - Output capture
- Validation
  - Assertions
- Cleanup
  - Application state is restore
  - Only if needed

## Popular testing frameworks

- Mocha - mochajs.org
- Jasmine - jasmine.github.io
- Jest - jestjs.io

## Test specifications

- DSL - Domain Specific Languages
- Standarizes the vocabulary
- Determines how to interact with the framework
  - TDD
  - BDD

## TDD vs BDD

- In TDD software requirements are turned into test cases
  - The software is improved until the test pass
  - The tests are runned over and over
  - Has the problem that not all the test are known before starting to write the software
- BDD is the same as TDD but with a different vocabulary and philosofical approach
  - Uses terminology about behaviour examples
  - Describes how and why with examples
  - The acceptance criteria is presented as an scenario
    - Given an initial context
    - When an event ocurrs
    - Then ensure some outcome

* BDD scenarios

```markdown
- Scenario: Reservation should be created with a valid email
  - Given
    - A submited email
    - And
    - The email is valid
  - When
    - The reservation is created
  - Then
    - Ensure the reservation is create
    - And
    - Reservation email is what was submitted
```

Using BDD style interface

```javascript
describe("Reservation creation", () => {
  it("Should create a reservation with a valid email", () => {
    const email = "username@example.com"
    const reservation = new Reservation({ email })
    expect(reservation).toHaveProperty("email", email)
  })
})
```

## EditorConfig to standarize editors

- editorconfig.org
- System that defines and mantains consisten coding styles across editors
- You need to use an editor that supports _editorconfig_ or install a plugin that adds support to the editor
- Standarization minimizes errors

```ini
; This is the root .editoconfig file
root = true

; Default section
[*]
indent_style = space
indent_size = 2
end_of_line = LF
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

; Only to markdown files
[*.{md,markdown}]
trim_trailing_whitespace = false
```

- You define the coding style in an `.editorconfig` file on the root of the project
- Uses the _INI_ format
- Property values are case insensitive
- Properties can be omited
- Comments are supported and are started with `#` or `;`
- You can have multiple `.editoconfig` files, but only one can have the `root` directive and it should be on the root of the project

- the `insert_final_newline` is important on Unix since every line must end with a newline. Otherwise it might **not** be recognized as a text file

## JavaScript linters

- Helps us find suspicious code
- Node has a built in linter

```bash
node --check script.js
```

- The most commonly used linters in JS are:
  - JSLint
  - JSHint
  - ESLint
- JSLint was the first to be created
  - jslint.com
  - Craeted by Duglas Crockford
  - Limited configuration options
  - No configuration file
  - No custom rules
  - Limited documentation
- JSHint
  - Started as a more configurable fork of JSLint
  - Every rule can be configured
  - You can use a configuration file
  - No custom rules or plugins
  - Good documentation
- ESLint

  - Many rules
  - Includes styling
  - Flexible rule configuration
  - Uses a configuration file
  - Good documentation
  - Is the current standard
  - Can be extended with plugins
  - Can generate reports

- Prettier.cio
  - Opinionated code formatter
  - Does not lint code
  - Can be used in conjunction with ESLint where ESLint looks for code errors and prettier takes care of the formatting

## Installing ESLint

- Not a good idea to install it globally
  - Can be confusing for some developers
  - Version differences can be problematic
- It's recommended to install it locally and run it with `npx`
- You do not need _Task Runners_

```bash
npm install eslint -D
npx eslint --help
npx eslint .
```

## Configuring ESLint

- Its done using a `.eslintrc.*` file
  - `.eslintrc.js`
  - `.eslintrc.json`
  - `.eslintrc.yaml`
- Its just an object with properties
- You could also use a `eslint` section in `package.json` to configure ESLint
- There are 3 properties in the ESLint configuration file `parserOptions`, `env`, `rules`

```javascript
// .eslintrc.js

module.exports = {
  // Javascript Language Options
  parserOptions: {
    // Max JavaScript supported version
    ecmaVersion: 12, // The sames as 2021. Defaults to 5
    // Type of file to be scanned
    sourceType: {
      script: true,
      module: false,
    },
  },
  // Predefined global variables
  env: {
    browser: false,
    node: true,
    es2020: true,
    jquery: false,
  },
  // What ESLint is looking for. Vlues can be "off", "warn", "error"
  rules: {
    "no-empty": "error",
    "no-multiple-empty-lines": "warn",
    "no-var": "error",
    "prefer-const": "error",
  },
}
```

## Using ESLint shareable config

- Npm packages that exports ESLint configuration objects
- The name must begin with `eslint-config-`
- To use it
  - Add the package to the `devDependencies`
  - In the `.eslintrc.*` file create an `extends` property
- ESLint comes with a recommended configuration `extends: "eslint:recommended"`

```javascript {8}
// .eslintrc.js

module.exports = {
  env: {
    node: true,
    browser: false,
  },
  extends: ["eslint:recommended"],
  rules: {
    //"no-empty": "error", // Not needed because of the recommended
    "no-multiple-empty-lines": "warn",
    "no-var": "error",
    "prefer-const": "error",
  },
}
```

- There are a lot of shareable configurations: https://github.com/dustinspecker/awesome-eslint
- A shareable config can extend one or more additional configurations
- Start with an existing configuration, then, using the `rules` modify its behaviour
- use the `package.json` `peerDependencies` to specify any dependant configs or plugins
- Use git+ssh `npm install git+ssh://git@github.com/marioy47/eslint-config-mario#TAG`

## ESLint config hierarchy

- You can create a `.eslintrc.js` file on sub directory to change its configuration
- It has to be a _return_ object
- Create a _browser friendly_ configuration inside a nodejs project:

```javascript
// public/.eslintrc.js
({
  parserOptions: {
    sourceType: "script",
  },
  env: {
    browser: true,
    jquery: true,
    node: false,
  },
  rules: {
    "no-var": "off",
    "prefer-const": "off",
  },
});
```

- You can ignore files, like from third party projects, using a `.eslintignore` file on the root directory

## ESLint in VSCode

```bash
npm --install-extension dbaumer.eslint
```

- Enaable the extension when VSCode asks for it
- `Ctr-Shift-P` then `Fix all auto`

## Disable eslint on a code line

```javascript
let unusedVar = true; // eslint-disable-line no-unused-vars
```
