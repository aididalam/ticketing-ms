## Google Cloud
- Enable Google CLoud Build
- Updaate the skaffold.yaml file to use google cloud build
- Setup Ingress-Ngnix on our google cloud cluster **kubernetes.github.io/ingress-nginx**
- Update our hostfile to point to the remote cluster
- Restart Skaffold

### 2Skaffold
It will automatically change update of infra/k8 and also sync data in source directory

```
skaffold dev
```

- Create Auto Pilot Cluster
- run gcloud init
- configure the project
- connect to cluster

**Now we need to update Skaffold**
previous Skafolld Was:
```
apiVersion: skaffold/v2alpha3
kind: Config
deploy:
  kubectl:
    manifests:
      - ./infra/k8s/*
build:
  local:
    push: false
  artifacts:
    - image: aididalam/auth
      context: auth
      docker:
        dockerfile: Dockerfile
      sync:
        manual:
          - src: "src/**/*.ts"
            dest: .

```

new Skaffold will contain googleCloud Information under build section:
```
googleCloudBuild:
    projectId: projectID
```
**We will also need to commentout the local config as we are now adding google cloud**
Also the artifacts will change.
old one was:
```
- image: aididalam/auth
```
new one will be:
```
- image: us.grc.io/projectID/nameOfProjectDirectory
```
**We will also need to change image name in auth-depl file**

### 3.1 Setup Ingress
We need to [Go Here](https://kubernetes.github.io/ingress-nginx/deploy/)
Then we will need to run the command. At this time this is the command.It may update with time.
**Before run we must need to select the exact context from the docker**
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

For cloud service we need to run 1 more additional command. This can be found in that previous mentioned link.
```
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user $(gcloud config get-value account)
```

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

### 3.2 Add LoadBalencer
Now we will go to google cloud and then Networking section->Network Service->Load Balancing Section
and we will get the ip address

### Change the host
We will now put that ip in our host
```
sudo code /etc/hosts
```