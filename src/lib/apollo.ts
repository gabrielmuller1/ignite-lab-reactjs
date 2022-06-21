import { ApolloClient, InMemoryCache } from "@apollo/client"

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4o7qm8r0xgu01xr9vyy0kv5/master",
  cache: new InMemoryCache()
})