// register-user.js

/**
 * Mock function to register a user
 *
 * @param {string} name The name of the user
 * @param {number} age The age of the user
 * @param {string} type The type of the student
 *
 * @return {void}
 */
const registerUser = (name, age, type, options = {}) => {
  const settings = {
    major: options.major
  }
  console.log(`Registering ${name} of type ${type} and age ${age}`);
  console.log(`Major: ${settings.major}`);
}

export default registerUser;
