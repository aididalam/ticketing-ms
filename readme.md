### Athentication

We will use JWT to store logged in data. But there will some server side rendering and when It comes to server side rendering only JWT won't work. Because when we send the request only html file get back and then the javascript file loadded up via browser.

So when we use server side rendering calling anything with javascript in frontend is not possible. We need to do it in server side.

To do it in server side the one and only way is to use cookie. Because we can send cookie when we use serverside rendering.

To do it. We will need the following package
```
npm i cookie-session
npm install @types/cookie-session
```

### Setuping Secret keys to use globally

We have to use JWT secret key through all of our services. But assigning env to all services is not a wise idea and also setting env in k8s is also a tough task.

to setup k8s we need to run following command.
here in this we are setuping jwt key
```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=test
```

to get all secrets we can run this command
```
kubectl get secrets
```

To read keys from pods we need to add these lines of code
```
env:
            - name: JWT_KEY
              valueFrom:
                secretKeyRef:
                  name: jwt-secret
                  key: JWT_KEY
```

before
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: auth
  template:
    metadata:
      labels:
        app: auth
    spec:
      containers:
        - name: auth
          image: aididalam/auth
```

after
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-depl
spec:
  replicas: 1
  selector:
    matchLabels:
      app: auth
  template:
    metadata:
      labels:
        app: auth
    spec:
      containers:
        - name: auth
          image: aididalam/auth
          env:
            - name: JWT_KEY
              valueFrom:
                secretKeyRef:
                  name: jwt-secret
                  key: JWT_KEY
```

### Accessing Env from pods.

The best thing is to check env before starting the service.

### Making Structural Model Response.

In mongo db **id** is return as **_id** and there is also a key **__v** to modify this response we can change in model schema.

To modify the return we can add this in the schema

```
{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id
            delete ret.password;
            delete ret.__v
            delete ret._id
        }
    }
}
```

so the schema will look like this
```
const userSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id
            delete ret.password;
            delete ret.__v
            delete ret._id
        }
    }
});
```
### Important Notes

We will add a middleware to access current user from the request parameter.
So we have to assign a new property in request parameter
something like this:
```
req.currentUser= {}
```
but as we are using type script so it is not possible directly assign a new property. So to achive that we can follow this:
```
declare global{
    namespace Express{
        interface Request{
            currentUser?: UserPayload
        }
    }
}
```

the above code now add e extra optional property in the req