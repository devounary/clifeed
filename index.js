import PromptSync from "prompt-sync";
import Parser from "rss-parser";
import chalk from "chalk";
import figlet from "figlet";

const parser = new Parser();
const input = PromptSync();

async function displayFeedInformation(feed) {
  displayText("Posts\n");
  feed.items.forEach((item) => {
    displayFeedItem(item);
  });
}

function displayFeedItem(item) {
  console.log(
    chalk.blue("> Title: ") +
      item.title +
      chalk.blue("\n> Description: ") +
      item.content.replace(/&#8230;/g, "") +
      chalk.blue("\n > Link: ") +
      item.link +
      "\n"
  );
}

async function displayText(text) {
  await figlet(text, (err, data) => {
    console.log(data);
  });
}

(async () => {
  try {
    console.clear();
    await displayText("CLI Feed");
    let url = input("> Type a URL: ");

    if (!url) {
      console.log(chalk.red("URL is required. Exiting..."));
      return;
    }
    let feed = await parser.parseURL(url);
    displayFeedInformation(feed);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
})();
