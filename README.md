# Azure Service Bus Timeout

Sample code to test Service Bus Node.js SDK in what appears to be a bug when internet is unavailable for long periods of time.

## Simulation

1. Create `.env` from [template.env](template.env) filling up the required parameters.

2. Run it:

```s
npm i
npm start
```

3. Immediately disconnect from the internet and the program will exit in about 01:20 minutes.
