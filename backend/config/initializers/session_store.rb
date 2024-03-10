# frozen_string_literal: true

Rails.application.config.middleware.insert_after ActiveRecord::Migration::CheckPending, ActionDispatch::Cookies
Rails.application.config.middleware.insert_after ActionDispatch::Cookies, ActionDispatch::Session::RedisStore,
  servers: ["redis://#{ENV.fetch("REDIS_HOST") { "localhost" }}:6379/0"],
  expire_after: 3.days,
  key: "_redis_session_transback"
