import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      index: true,
    },

    leave_type: {
      type: String,
      enum: ["CL", "SL", "PL", "LOP"],
      required: true,
    },

    /**
     * Input date (YYYY-MM-DD)
     * Time will be derived automatically
     */
    start_datetime: {
      type: Date,
      required: true,
    },

    end_datetime: {
      type: Date,
      required: true,
    },

    leave_duration: {
      type: String,
      enum: ["FULL_DAY", "HALF_DAY"],
      default: "FULL_DAY",
    },

    /**
     * Required only if HALF_DAY
     */
    half_day_type: {
      type: String,
      enum: ["AM", "PM"],
    },

    reason: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

/**
 * Automatically set time based on leave duration
 */
leaveSchema.pre("validate", function (next) {
  const start = new Date(this.start_datetime);
  const end = new Date(this.end_datetime);

  // FULL DAY
  if (this.leave_duration === "FULL_DAY") {
    start.setHours(9, 0, 0, 0);   // 09:00
    end.setHours(18, 0, 0, 0);   // 18:00
  }

  // HALF DAY
  if (this.leave_duration === "HALF_DAY") {
    if (!this.half_day_type) {
      return next(new Error("half_day_type is required for HALF_DAY leave"));
    }

    if (this.half_day_type === "AM") {
      start.setHours(9, 0, 0, 0);
      end.setHours(13, 0, 0, 0);
    }

    if (this.half_day_type === "PM") {
      start.setHours(14, 0, 0, 0);
      end.setHours(18, 0, 0, 0);
    }
  }

  if (end <= start) {
    return next(new Error("End datetime must be after start datetime"));
  }

  this.start_datetime = start;
  this.end_datetime = end;

  next();
});
export default leaveSchema 