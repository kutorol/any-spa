export enum EHTTPMethod {
  GET = "GET",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export enum EHTTPCodes {
  OK = 200,
  NOT_FOUND = 404,
  INTERNAL = 500,
  VALIDATION_CODE = 422,
  BAD_REQUEST_CODE = 400,
  FORBIDDEN_CODE = 403
}
