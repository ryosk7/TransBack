class SessionController < ApplicationController
  def current_user_set
    session[:current_user_id] = User.find_by(address: params[:address])&.id
    render json: { status: "ok" }
  end
end
