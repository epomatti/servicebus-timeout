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

Create `.env` and fill with environment values:

```sh
cp config/template.env .env
```

Run it:

```sh
npm i
npm start
```

Immediately disconnect from the internet. Wait at least 1:20 minutes.

Reconnect to the internet and add messages to confirm it continues to operate:

```sh
node src/enqueue.js
```

All messages should be consumed.