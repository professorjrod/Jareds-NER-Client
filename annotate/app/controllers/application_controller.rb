# app/controllers/application_controller.rb
class ApplicationController < ActionController::API
  include ActionController::Cookies

  def spa
    render html: 'Use the react client on port 4000.'.html_safe
  end

  def hello_world
    session[:count] = (session[:count] || 0) + 1
    render json: { count: session[:count] }
  end
end
