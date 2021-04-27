import { GraphQLScalarType } from 'graphql'

export default {
  Date: (GraphQLDateTime: GraphQLScalarType) => {
    return GraphQLDateTime
  }
}
