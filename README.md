# Joi-object-id-extention

This super cool package is a JOI extension that enables you to verify objectIds (like mongo document ids)

## Installation

```shell
npm install joi-object-id-extention
```

## Usage

```javascript
const Joi = require('@hapi/joi');
const newJoi = require('joi-object-id-extention');

const schema = Joi.object({
    id: newJoi.string().objectid()
})
```

###### Want to make your own?
Check out this [blog post](https://medium.com/@zanwar.shubham/creating-your-first-joi-extension-b8f810073e15). Also feel free to contribute to this repo by raising PRs or creating relevant issues
