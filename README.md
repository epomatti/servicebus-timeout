# Azure Service Bus Timeout

Sample code to test Service Bus Node.js SDK in what appears to be a bug when internet is unavailable for long periods of time.

### Infrasctructure

```sh
az servicebus namespace create -n <name> -g <group> -l <location> --sku Basic
az servicebus queue create -n <name> --namespace-name <namespace> -g <group>

az servicebus namespace authorization-rule keys list \
    -n RootManageSharedAccessKey -g <group> --namespace-name <namespace> \
    --query primaryConnectionString -o tsv
```

### Simulation

1. Create `.env` from [template.env](template.env) filling up the required parameters.

2. Run it:

```sh
npm i
npm start
```

3. Immediately disconnect from the internet and the program will exit in about 01:20 minutes.

4. Add messages to confirm it continues to operate:

```sh
node src/enqueue.js
```
