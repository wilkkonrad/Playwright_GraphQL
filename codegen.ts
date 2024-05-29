
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphqlzero.almansi.me/api",
  documents: "graphql-codegen",
  generates: {
    "graphql-codegen -graphql.tsx": {
      preset: "client",
    }
  }
};

export default config;
