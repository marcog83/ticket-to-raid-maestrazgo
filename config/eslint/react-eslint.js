module.exports={
  "extends": [
    "./base-eslint",
    require.resolve("eslint-config-airbnb-typescript"),
    require.resolve("eslint-config-airbnb/hooks")
  ],
  "rules": {
    "react/jsx-props-no-spreading":"off",
    "react/function-component-definition": [
      "error",
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }
    ],
    "react/react-in-jsx-scope":"off",
    
    "react/jsx-no-useless-fragment": [
      "error",
      {
        "allowExpressions": true
      }
    ]
  },
  "overrides": [
    {
      "files": ["*.tsx"],
      "rules": {
        "react/require-default-props": "off"
      }
    }
  ]
}