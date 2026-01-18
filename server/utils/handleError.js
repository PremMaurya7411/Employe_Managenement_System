export const handleError = (res, error) => {
  // Handle Zod validation errors
  if (error.name === "ZodError" || error.issues) {
    const issues = error.issues || error.errors || [];
    const formattedErrors = issues.map((err) => ({
      field: Array.isArray(err.path) ? err.path.join(".") : String(err.path ?? ""),
      message: err.message,
    }));

    return res.status(422).json({
      success: false,
      message: formattedErrors[0]?.message || "Validation failed",
      errors: formattedErrors,
    });
  }

  // Handle Mongoose validation errors
  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors).map(({ path, message }) => ({
      field: path,
      message,
    }));

    return res.status(400).json({
      success: false,
      message: errors[0]?.message || "Validation failed",
      errors,
    });
  }

  // Handle duplicate key errors
  if (error.code === 11000) {
    // Try to get field from keyValue first (most reliable)
    let field = null;
    
    if (error.keyValue && Object.keys(error.keyValue).length > 0) {
      field = Object.keys(error.keyValue)[0];
    }
    
    // If keyValue is empty, try to extract from keyPattern
    if (!field && error.keyPattern && Object.keys(error.keyPattern).length > 0) {
      field = Object.keys(error.keyPattern)[0];
    }
    
    // If still no field, try to extract from error message
    // MongoDB error format: "E11000 duplicate key error collection: db.collection index: field_1 dup key: { field: value }"
    if (!field && error.message) {
      // Try to match "index: collection.field_1" or "dup key: { field:"
      const indexMatch = error.message.match(/index:\s*\w+\.(\w+)_\d+/);
      const dupKeyMatch = error.message.match(/dup key:\s*\{\s*(\w+):/);
      
      if (indexMatch) {
        field = indexMatch[1];
      } else if (dupKeyMatch) {
        field = dupKeyMatch[1];
      }
    }
    
    // Fallback to generic message if field still not found
    if (!field) {
      return res.status(400).json({
        success: false,
        message: "Duplicate key error: A record with this value already exists",
        errors: [{ field: "unknown", message: "A record with this value already exists" }],
      });
    }

    return res.status(400).json({
      success: false,
      message: `${field} must be unique`,
      errors: [{ field, message: `${field} must be unique` }],
    });
  }

  return res.status(error.status ?? error.statusCode ?? 400).json({
    success: false,
    message: error.message ?? "Something went wrong",
  });
};
