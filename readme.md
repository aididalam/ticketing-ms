### Conecting Mongodb
to connect mongodb we must use the cluster ip. Lcalhost won't work here
```
mongodb://localhost:port
```
We will change the above code with the given IP
```
mongodb://auth-mongo-srv:27017
```

### Mongoose and Type Script:

As we are using ts so we must find a way to define the property of mongoose class. Otherwise we will not able to find the errors.
This can lead us to easily add typos in Model and can lead us to add some fake columns and this may add fake data or lead to crash the db

[Check from line 3 to line 7](https://github.com/aididalam/ticketing-ms/blob/237b770552eccc713ff7694de1c0f52a8acfdbc9/auth/src/models/user.ts#L3-L7)

We will not directly use the the new User() function. Because if we use it then this function does not have any ability
to check the types. So we will add a new function with the provided interface

[Check from line 21 to line 24](https://github.com/aididalam/ticketing-ms/blob/237b770552eccc713ff7694de1c0f52a8acfdbc9/auth/src/models/user.ts#L21-L24)

