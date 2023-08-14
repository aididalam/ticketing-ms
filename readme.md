### Codesharing

To share code we have choose npmjs.
Here we will create a public organization and then we will publish our module here.

Here we crate a new folder named common.
In general we donot care about content in **package.json** but here we need to work with 
- name
- version

package.json now looks like this

```
{
  "name": "@sgtickets445/common",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

To publish we need to initial a git repo
Then we need to commit all changes
Then we need to run this command

```
npm login
```

```
npm publish --access public
```

Now we will conver TS into plain js
Reffering this [video](https://www.udemy.com/course/microservices-with-node-js-and-react/learn/lecture/19123078#overview)

```
tsc --init
```
```
npm install typescript del-cli --save-dev
```

Now we will edit tsconfig.json file 

```
    "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
```

```
    "outDir": "./build",                                   /* Specify an output folder for all emitted files. */
```

We will update package.json script section

```
  "scripts": {
    "clean": "del ./build/*",
    "build": "npm run clean && tsc"
  },
```

Finally We will run

```
npm run build
```

In package.json file these lines are updated or added

```
  "main": "./build/index.js",
  "types": "./build/index.d.ts",
  "files": [
    "build/**/*"
  ],
```

**When we change something we need to increase the version number**