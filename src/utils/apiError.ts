type Code = 200 | 201 | 400 | 401 | 403 | 404 | 500 | 501 | 502;

class ApiError extends Error {
  statusCode: Code;
  success: boolean;
  errors: any;
  message:string
  constructor(statusCode: Code, message: string, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.message = errors?.message || message;
    this.success = false;
    this.errors = errors;
  }
}

export default ApiError;
