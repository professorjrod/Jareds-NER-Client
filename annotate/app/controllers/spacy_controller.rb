class SpacyController < ApplicationController
  require 'net/http'
  def demo
    input_text = params[:text]
    uri = URI.parse('http://localhost:5000/demo')
    http = Net::HTTP.new(uri.host, uri.port)
    req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
    req.body = input_text.to_json
    res = http.request(req)
    render json: res.body, status: :ok
  end
end
