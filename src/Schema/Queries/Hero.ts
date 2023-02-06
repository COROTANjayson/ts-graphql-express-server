import { GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { HeroCheckPointType, HeroInput, HeroInputCheckpoint, HeroInputPushRow, HeroPullBulk, HeroType } from "../TypeDefs/Hero";


export const GET_HEROES = {
    type: new GraphQLList(HeroType),
    args: {
        amount: { type: GraphQLInt },

    },
    resolve(parent: any, args: any) {
        const documents: any = [
            {
                id: '123',
                name: 'jayson',
                color: 'blue',
                updatedAt: 123,
                deleted: false
            },
            {
                id: '123',
                name: 'jake',
                color: 'green',
                updatedAt: 124,
                deleted: false
            },
        ]
        return documents
    }
}

export const PULL_HERO = {
    type: HeroPullBulk,
    args: {
        checkpoint: { type: HeroInputCheckpoint },
        limit: { type: GraphQLInt },

    },
    async resolve(parent: any, args: any) {
        const { checkpoint, limit } = args
        console.log('limit',limit)
        console.log("--------pulling data from server side database---------", checkpoint, limit)
        const lastId = checkpoint ? checkpoint.id : '';
        const minUpdatedAt = checkpoint
            ? checkpoint.updatedAt
            : 0;
        // get all documents FROM MONGODB
        // const documents = await Hero.find().sort({ createdAt: -1 })
        const documents: any = [
            {
                id: 'dsfgea',
                name: 'jayson',
                color: 'blue',
                updatedAt: 124,
                // deleted: false
            },
            {
                id: 'safdsgsd',
                name: 'jake',
                color: 'green',
                updatedAt: 122,
                deleted: true
            },
        ]
        // sorted by updatedAt first and the id as second
        const sortedDocuments = documents.sort((a: { updatedAt: number; id: number; }, b: { updatedAt: number; id: number; }) => {
            if (a.updatedAt > b.updatedAt) return 1;
            if (a.updatedAt < b.updatedAt) return -1;
            if (a.updatedAt === b.updatedAt) {
                if (a.id > b.id) return 1;
                if (a.id < b.id) return -1;
                else return 0;
            }
        });

        // only return documents newer than the input document
        const filterForMinUpdatedAtAndId = sortedDocuments.filter((doc: { updatedAt: number; id: number; }) => {
            if (doc.updatedAt < minUpdatedAt) return false;
            if (doc.updatedAt > minUpdatedAt) return true;
            if (doc.updatedAt === minUpdatedAt) {
                // if updatedAt is equal, compare by id
                if (doc.id > lastId) return true;
                else return false;
            }
        });
        console.log('filterForMinUpdatedAtAndId', filterForMinUpdatedAtAndId)
        // only return some documents in one batch
        const limitedDocs = filterForMinUpdatedAtAndId.slice(0, limit);
        console.log('limitedDocs', limitedDocs)
        // use the last document for the checkpoint
        const lastDoc = limitedDocs[limitedDocs.length - 1];
        return {
            documents: limitedDocs,
            checkpoint: lastDoc
                ? {
                    id: lastDoc.id,
                    updatedAt: lastDoc.updatedAt
                }
                : {
                    id: lastId,
                    updatedAt: minUpdatedAt,
                },
        }
    }
}