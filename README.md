# Joi-object-id-extention

This super cool package is a JOI extension that enables you to verify objectIds (like mongo document ids)

## Usage

```javascript
const Joi = require('@hapi/joi');
const newJoi = require('joi-object-id-extention');

const schema = Joi.object({
    id: newJoi.string().objectid()
})
```
