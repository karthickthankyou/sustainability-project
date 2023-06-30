import type { CodegenConfig } from '@graphql-codegen/cli'

const documentsPattern = '**/*.gql.tsx'
const plugins = [
  'typescript',
  'typescript-operations',
  'named-operations-object',
  'typescript-react-apollo',
]
const configDetails = {
  avoidOptionals: false,
  exposeQueryKeys: true,
  fetcher: {
    endpoint: 'http://localhost:3000/graphql',
  },
  pureMagicComment: true,
}

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../apps/api/src/schema.gql',
  watch: true,
  generates: {
    './src/generated/index.tsx': {
      documents: `./src/${documentsPattern}`,
      plugins,
      config: configDetails,
    },
    '../../standalone-projects/mobile-app/gql/generated/index.tsx': {
      documents: `../../standalone-projects/mobile-app/${documentsPattern}`,
      plugins,
      config: configDetails,
    },
    '../../apps/api/prisma/seed/generated/': {
      documents: `../../apps/api/${documentsPattern}`,
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
