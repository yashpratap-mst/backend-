import mongoose, { Schema, SchemaType } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videfiles: {
      type: string, // cloudnary url
      require: true,
    },
    thumbnail: {
      type: string, // cloudnary url
      require: true,
    },
    title: {
      type: string,
      require: true,
    },
    duration: {
      type: Number,
      require: true,
    },
    views: {
      type: number,
      default: 0,
    },
    ispublished: {
      type: Boolean,
      deafult: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
