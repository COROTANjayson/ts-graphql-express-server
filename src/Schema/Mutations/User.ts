import { GraphQLInputObjectType, GraphQLList, GraphQLString } from "graphql";
import { UserType, UserInputType } from "../TypeDefs/User";


export const CREATE_USER = {
    type: UserType,
    args:{
        userType: {type: UserInputType},

    },
    resolve(parent:any, args: any) {
        const {name, email, password} = args;
        return {name, email, password}
    }
}