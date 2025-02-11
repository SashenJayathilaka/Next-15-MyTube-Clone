import Mux from "@mux/mux-node";

// this reads your MUX_TOKEN_ID and MUX_TOKEN_SECRET
// from your environment variables
// https://dashboard.mux.com/settings/access-tokens

export const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});
