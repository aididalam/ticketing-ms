### Kubernetes Namespace

In server rendering system we cannot directly connect to other service. As each service is running on diffrent container.
So we will need to go throw the namescape and then findout the service.

```
kubectl get namespaces
```

To get services for specific namespace

```
kubectl get services -n NAMESPACE
```

So the url will be:
```
http://SERVICE_NAME.NAMESPACE.svc.cluster.local
```