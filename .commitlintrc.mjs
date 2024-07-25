// .commitlintrc.mjs

/** @type {import("@commitlint/config-conventional").Config} */
export default {
  extends: [
    "@commitlint/config-conventional", // scoped packages are not prefixed
  ],
};
