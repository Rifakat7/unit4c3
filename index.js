const express = require("express");

const mongoose = require("mongoose");
const app = express();


const connect = ()=>{

    return mongoose.connect(

        "mongodb+srv://Rifakat7:Rifaqat9225@cluster0.9zcba.mongodb.net/DataBase?retryWrites=true&w=majority"
    )
};

const userSchema = new mongoose.Schema(
    {
        firstName:{type:String,required:true,minlength:3,maxlength:30},
        lastName:{type:String,minlength:3,maxlength:30,required:false},
        age:{type:Number,required:true},
        email:{type:String,required:true,unique:true},
        profileImages:{type:String,required:true}
        
    },
    {
        timestamps:true,required:true,versionKey:false
    }
);

const User = mongoose.model("user",userSchema);

const bookSchema = new mongoose.Schema(
    {
        likes:{type:Number,default:0,
        enum: {values:[0,1],message:'enter 1 for like and 0 dor dislike'}
        },
        coverImage:[{type:String,required:true}],
        content:{type:Number,required:true},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"Publication",required:true}

    },
    {
        timestamps:{type:String,require:true}
    }
);

const Book = new mongoose.model("book",bookSchema);

const publicationSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},


    },
    {
        timestamps:{type:String,require:true}
    }
)

const Publication = new mongoose.model("publication",publicationSchema);

const commentSchema = new mongoose.Schema(
    {
        body:{type:String,required:true},

    },
    {
        timestamps:{type:String,require:true}
    }

);
const Comment = new mongoose.model("comment",commentSchema);


app.listen(5000,async(req,res)=>{
    try {
        await connect();
    } catch (err) {
        console.log({message:err.message});
    }
    console.log("listening at port 5000");
})