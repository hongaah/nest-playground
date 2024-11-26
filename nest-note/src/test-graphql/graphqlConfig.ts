import { ApolloDriver } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export const graphqlConfig = {
  driver: ApolloDriver,
  typePaths: ['./**/*.graphql'],
  playground: false,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
};
