# frozen_string_literal: true

require 'jwt'

# This class is responsible for encoding and decoding JWTs for authentication
class JwtManager
  HMAC_SECRET = Rails.application.secrets.secret_key_base
  ALGORITHM = 'HS256'

  def self.encode(payload)
    JWT.encode(payload, HMAC_SECRET, ALGORITHM)
  end

  def self.decode(token)
    # Parameters are token, public key, whether to validate or not, then
    # what to validate. We need to validate the algorithm to ensure no one
    # can send us a token with the algorithm 'none'
    # https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/#Meet-the--None--Algorithm
    JWT.decode(token, HMAC_SECRET, true, algorithm: ALGORITHM)
  end
end
