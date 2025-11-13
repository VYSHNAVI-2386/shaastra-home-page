import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4002/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
