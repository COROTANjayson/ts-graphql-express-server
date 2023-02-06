import { GraphQLInputObjectType, GraphQLList, GraphQLString } from "graphql";
import { HeroInput, HeroInputPushRow, HeroType } from "../TypeDefs/Hero";


export const CREATE_HERO = {
    type: HeroType,
    args: {
        heroInput: { type: HeroInput },

    },
    resolve(parent: any, args: any) {
        const { name, email, password } = args;
        return { name, email, password }
    }
}

export const PUSH_HERO = {
    type: new GraphQLList(HeroType),
    args: {
        row: { type: new GraphQLList(HeroInputPushRow) },

    },
    resolve(parent: any, args: any) {
        const { row } = args;
        // const pubsub = new PubSub();
        // let documents = await Hero.find().sort({ createdAt: -1 })
        let documents: any = [
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
        // new data from client side database
        const rows = row;
        let lastCheckpoint = {
            id: '',
            updatedAt: 0,
        };

        const conflicts: any = [];
        const writtenDocs: any = [];
        console.log('---------------New Data pushed-----------------------', row)

        rows.forEach(async (row: {
            newDocumentState: {
                updatedAt: number; id: any;
            }; assumedMasterState: { updatedAt: any; };
        }) => {
            const docId = row.newDocumentState.id;
            // const docCurrentMaster = documents.find((d: { id: any; }) => d.id === docId);
            // /**
            //  * Detect conflicts.
            //  */
            // if (
            //     docCurrentMaster &&
            //     row.assumedMasterState &&
            //     docCurrentMaster.updatedAt !==
            //     row.assumedMasterState.updatedAt
            // ) {
            //     conflicts.push(docCurrentMaster);
            //     return;
            // }

            let doc:any = row.newDocumentState;
            documents = documents.filter((d: { id: any; }) => d.id !== doc.id);

            // // query from mongodb
            // const mongoQuery = await Hero.findById(docId)

            // // if id exist in mongodb, update it
            // if (mongoQuery) {
            //    await Hero.findByIdAndUpdate(docId, {
            //         name: doc.name,
            //         color: doc.color,
            //         updatedAt: doc.updatedAt
            //    })
            // } else {
            //     console.log('saved to mongodb:', docId)
            //     const newRecipe = new Hero({
            //         _id: mongoose.Types.ObjectId(doc.id),
            //         name: doc.name,
            //         color: doc.color,
            //         updatedAt: doc.updatedAt,
            //         deleted: doc.deleted,
            //     });
            //     await newRecipe.save();
            // }

            // save the new checkpoint
            lastCheckpoint.id = doc.id;
            lastCheckpoint.updatedAt = doc.updatedAt;
            writtenDocs.push(doc);
        });

        // console.log('documents',documents)
        // pubsub.publish('streamHero', {
        //     streamHero: {
        //         documents: writtenDocs,
        //         checkpoint: lastCheckpoint,
        //     },
        // });

        // console.log('## current documents:');
        // console.log(JSON.stringify(documents, null, 4));
        // console.log('## conflicts:');
        // console.log(JSON.stringify(conflicts, null, 4));
        // console.log('conflicts',conflicts)
        return conflicts;
    }
}