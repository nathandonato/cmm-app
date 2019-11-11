# frozen_string_literal: true

require 'jwt_manager'

# Accepts a token and returns an object that, when passed as a header, will be
# accessible by response.cookies in a controller.
def jwt_cookie_header(jwt)
  { 'HTTP_COOKIE' => "cmm_jwt=#{jwt}" }
end

def generate_jwt_for(user)
  JwtManager.encode(user_id: user.id)
end
