import mongoose,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const playlistSchema=new Schema({
    name:{
        type:String,
        requird:true
    },
    descrption:{
       type:String,
       required:true
    },

    videos:[
        {
            type:Schema.type.ObjectId,
            ref:"Viedo"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
    },

{
    Timestamp:true
}
)
//playlistSchema.plugin(mongooseAggregatePaginate)
export const Playlist=mongoose.model("Playlist",playlistSchema)