# Azure Service Bus Timeout

Sample code created to demonstrate my issue [#7689](https://github.com/Azure/azure-sdk-for-js/issues/7689) with Service Bus Node.js SDK for a bug that locked the receiver when the internet was unavailable for long periods of time.

This bug has been fixed by Microsoft.

### Infrasctructure

```sh
az servicebus namespace create -n '<namespace>' -g '<group>' -l '<location>' --sku Basic
az servicebus queue create -n '<name>' --namespace-name '<namespace>' -g '<group>'

az servicebus namespace authorization-rule keys list \
    -n RootManageSharedAccessKey -g <group> --namespace-name <namespace> \
    --query primaryConnectionString -o tsv
```

### Simulation

Create `.env` and fill with environment values:

```sh
cp config/sample.env .env
```

Run it:

```sh
yarn install
yarn run dequeue
```

Now disconnect your computer from the internet and wait at least `1:20` minutes.

Reconnect to the internet and add messages to confirm it continues to operate:

```sh
yarn run enqueue
```

All messages should be consumed.