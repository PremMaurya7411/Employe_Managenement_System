   import mongoose from "mongoose";
   import bcrypt from "bcrypt";

   const userSchema = new mongoose.Schema(
     {
       name: {
         type: String,
         required: true,
         trim: true,
       },

       email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         index: true,
       },

       password: {
         type: String,
         required: true,
         select: false,
       },

       role: {
         type: String,
         enum: ["admin", "employee"],
         default: "employee",
       },

       is_active: {
         type: Boolean,
         default: true,
       },
     },
     { timestamps: true }
   );

   /**
    * Hash password before save
    */
   userSchema.pre("save", async function (next) {
     if (!this.isModified("password")) return next();
     this.password = await bcrypt.hash(this.password, 12);
     next();
   });

   export default userSchema;