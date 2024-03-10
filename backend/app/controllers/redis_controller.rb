class RedisController < ApplicationController
  def session_set
    session[:test_time] = Time.current
    render json: { status: "ok" }
  end

  def session_get
    render json: { time: session[:test_time]&.iso8601 }
  end
end
