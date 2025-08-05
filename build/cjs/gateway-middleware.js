"use strict";

exports.__esModule = true;
exports.gatewayMiddleware = gatewayMiddleware;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _errorHandler = require("./error-handler");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// This middleware checks for a valid gateway token in the request headers.
// It verifies the token against a secret and ensures the token's identifier is allowed.
// If the token is missing, invalid, or expired, it throws an appropriate error.
const allowedTokens = ['auth', 'seller', 'buyer', 'gig', 'search', 'order', 'review', 'message'];
function gatewayMiddleware(req, res, next) {
  var _req$headers;
  const token = (_req$headers = req.headers) == null ? void 0 : _req$headers.gatewaytoken;
  if (!token) {
    throw new _errorHandler.NotAuthorizedError('Missing or invalid "gatewayToken" in request headers.', 'Gateway Middleware');
  }
  try {
    const secret = process.env.GATEWAY_SECRET || '';
    if (!secret) {
      throw new _errorHandler.InternalServerError('Gateway secret is not configured in environment.', 'Gateway Middleware');
    }
    const payload = _jsonwebtoken.default.verify(token, secret);
    if (!allowedTokens.includes(payload.id)) {
      throw new _errorHandler.NotAuthorizedError('Invalid service identifier in gateway token.', 'Gateway Middleware');
    }
    next();
  } catch (error) {
    return next(new _errorHandler.NotAuthorizedError('Invalid or expired gateway token.', 'Gateway Middleware'));
  }
}
//# sourceMappingURL=gateway-middleware.js.map