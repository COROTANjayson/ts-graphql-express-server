import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { CREATE_USER } from './Mutations/User'
import { GET_ALL_USERS } from './Queries/User'
import { GET_HEROES, PULL_HERO } from './Queries/Hero'
import { CREATE_HERO, PUSH_HERO } from './Mutations/Hero'

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        getAllUsers: GET_ALL_USERS,
        getHeroes: GET_HEROES,
        pullHero: PULL_HERO
    }
})

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: {
        createdUser: CREATE_USER,
        createHero: CREATE_HERO,
        pushHero: PUSH_HERO
    }
})
export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})