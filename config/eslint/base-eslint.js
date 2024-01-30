module.exports={
  "extends": [
    require.resolve("eslint-config-airbnb"),
    require.resolve("eslint-config-airbnb-typescript/base")
  ],
  "rules": {
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/no-shadow": [
      "error",
      {
        "ignoreOnInitialization": true
      }
    ],
    "array-bracket-newline": [
      "error",
      {
        "multiline": true
      }
    ],
    "array-bracket-spacing": [
      "error",
      "always",
      {
        "arraysInArrays": false,
        "objectsInArrays": false
      }
    ],
    "import/prefer-default-export": "off",
    "max-len": [
      "error",
      {
        "code": 120
      }
    ],
    "object-curly-newline": "off",
    "object-curly-spacing": [
      "error",
      "always",
      {
        "arraysInObjects": true,
        "objectsInObjects": true
      }
    ],
    "template-curly-spacing": [
      "error",
      "always"
    ]
  }
}