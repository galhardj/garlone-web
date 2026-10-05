import contentstack from "@contentstack/delivery-sdk";

const stack = contentstack.stack({
  apiKey: "blt34f9c062eb4fca11",
  deliveryToken: "cs34e135933f1b8d9eda0fb899",
  environment: "production",
  branch: "main",
});

export const entry = await stack
  .contentType("footer")
  .entry("bltfcb70edbf001be69")
  // .includeReference("carousel_items")
  .fetch();

console.log(entry);
