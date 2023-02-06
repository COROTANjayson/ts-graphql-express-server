import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLInputObjectType } from 'graphql';

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        updatedAt: { type: GraphQLFloat },
        deleted: { type: GraphQLBoolean }
    })
});

export const UserInputType = new GraphQLInputObjectType({
    name: 'UserInputType',
    fields: () => ({
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        updatedAt: { type: GraphQLFloat },
        deleted: { type: GraphQLBoolean }
    })
})

