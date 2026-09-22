import contentstack from "@contentstack/delivery-sdk";

const stack = contentstack.stack({
  apiKey: "blt3237f43fdd69f9ca",
  deliveryToken: "cs572cbcd28e28e60f18e82c4b",
  environment: "preview",
  branch: "main",
});

export const entry = await stack
  .contentType("carousel")
  .entry("bltd969ed21021506b3")
  .includeReference("carousel_items")
  .fetch();

// console.log(entry);
