const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");

require("dotenv").config();

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

async function main() {
  while (true) {
    try {
      this.sbClient = ServiceBusClient.createFromConnectionString(connectionString);
      this.queueClient = this.sbClient.createQueueClient(queueName);
      this.receiver = this.queueClient.createReceiver(ReceiveMode.receiveAndDelete);
      // Clients locks here and keep waiting for messages
      console.log("Waiting for messages: " + new Date());
      const messages = await this.receiver.receiveMessages(10);
      messages.forEach(({ body }) => console.log(body));
      await this.queueClient.close();
    } catch (e) {
      console.error(e);
    } finally {
      // TODO would make sense to to delay the next execution, instead of imediate loop
      console.log("Program ended: " + new Date());
      await this.sbClient.close();
    }
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});