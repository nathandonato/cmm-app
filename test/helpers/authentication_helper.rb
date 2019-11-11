# frozen_string_literal: true

# Accepts a token and returns an object that, when passed as a header, will be
# accessible by response.cookies in a controller.
def jwt_cookie_header(jwt)
  { 'HTTP_COOKIE' => "cmm_jwt=#{jwt}" }
end
