const { ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

const listOfScientists = [
  {
    name: "Einstein",
    firstName: "Albert"
  },
  {
    name: "Heisenberg",
    firstName: "Werner"
  },
  {
    name: "Curie",
    firstName: "Marie"
  },
  {
    name: "Hawking",
    firstName: "Steven"
  },
  {
    name: "Newton",
    firstName: "Isaac"
  },
  {
    name: "Bohr",
    firstName: "Niels"
  },
  {
    name: "Faraday",
    firstName: "Michael"
  },
  {
    name: "Galilei",
    firstName: "Galileo"
  },
  {
    name: "Kepler",
    firstName: "Johannes"
  },
  {
    name: "Kopernikus",
    firstName: "Nikolaus"
  }
];

async function main() {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

  // If sending to a Topic, use `createTopicClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);
  const sender = queueClient.createSender();

  try {
    for (let index = 0; index < listOfScientists.length; index++) {
      const scientist = listOfScientists[index];
      const message = {
        body: `${scientist.firstName} ${scientist.name}`,
        label: "Scientist"
      };

      console.log(`Sending message: ${message.body} - ${message.label}`);
      await sender.send(message);
    }

    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});