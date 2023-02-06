import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLBoolean, GraphQLInputObjectType, GraphQLList } from 'graphql';

export const HeroType = new GraphQLObjectType({
    name: 'Hero',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        color: { type: GraphQLString },
        updatedAt: { type: GraphQLFloat },
        deleted: { type: GraphQLBoolean }
    })
});

export const HeroCheckPointType = new GraphQLObjectType({
    name: 'HeroCheckPoint',
    fields: () => ({
        id: { type: GraphQLString },
        updatedAt: { type: GraphQLFloat },
    })
})


export const HeroPullBulkT0DocumentsT0T0 = new GraphQLObjectType({
    name: 'HeroPullBulkT0DocumentsT0T0',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        color: { type: GraphQLString },
        updatedAt: { type: GraphQLFloat },
        deleted: { type: GraphQLBoolean }
    })
});
export const HeroPullBulkT0CheckpointT0 = new GraphQLObjectType({
    name: 'HeroPullBulkT0CheckpointT0',
    fields: () => ({
        id: { type: GraphQLString },
        updatedAt: { type: GraphQLFloat },
    })
})

export const HeroPullBulk = new GraphQLObjectType({
    name: 'HeroPullBulk',
    fields: () => ({
        documents: { type: new GraphQLList(HeroPullBulkT0DocumentsT0T0) },
        checkpoint: { type: HeroPullBulkT0CheckpointT0 },
    })
})

export const HeroInput = new GraphQLInputObjectType({
    name: 'HeroInput',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        color: { type: GraphQLString },
        updatedAt: { type: GraphQLFloat },
        deleted: { type: GraphQLBoolean }
    })
})

export const HeroInputPushRowT0AssumedMasterStateT0 = new GraphQLInputObjectType({
    name: 'HeroInputPushRowT0AssumedMasterStateT0',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        color: { type: GraphQLString },
        updatedAt: { type: GraphQLFloat },
        deleted: { type: GraphQLBoolean }
    })
})

export const HeroInputPushRowT0NewDocumentStateT0 = new GraphQLInputObjectType({
    name: 'HeroInputPushRowT0NewDocumentStateT0',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        color: { type: GraphQLString },
        updatedAt: { type: GraphQLFloat },
        deleted: { type: GraphQLBoolean }
    })
})

export const HeroInputPushRow = new GraphQLInputObjectType({
    name: 'HeroInputPushRow',
    fields: () => ({
        assumedMasterState: {type: HeroInputPushRowT0AssumedMasterStateT0},
        newDocumentState: {type: HeroInputPushRowT0NewDocumentStateT0}
    })
})

export const HeroInputCheckpoint = new GraphQLInputObjectType({
    name: 'HeroInputCheckpoint',
    fields: () => ({
        id: {type: GraphQLString},
        updatedAt: {type: GraphQLFloat}
    })
})

export const HeroInputHeaders = new GraphQLInputObjectType({
    name: 'HeroInputHeaders',
    fields: () => ({
        Authorization: {type: GraphQLString},
       
    })
})









