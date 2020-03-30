# Azure Service Bus Timeout

Sample code to test Service Bus Node.js SDK in what appears to be a bug when internet is unavailable for long periods of time.

## Simulation

1. Create `.env` from [template.env](template.env)

2. Run it

```s
npm i
npm debug
```

3. Now disconnect from Wi-Fi, the program will exit in about 01:20 minutes.
