const { ServiceBusClient } = require("@azure/service-bus");

require("dotenv").config();

const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

async function main() {
  while (true) {
    try {
      this.sbClient = new ServiceBusClient(connectionString);
      this.queueReceiver = this.sbClient.createReceiver(queueName, "receiveAndDelete");
      this.sbClient.
        // Clients locks here and keep waiting for messages
        console.log("Waiting for messages: " + new Date());
      const messages = await this.queueReceiver.receiveMessages(10);
      messages.forEach(({ body }) => console.log(body));
      await this.queueReceiver.close();
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