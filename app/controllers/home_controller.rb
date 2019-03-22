class HomeController < ApplicationController
  before_action :authenticate_user_if_not_home_page!

  def index; end

  private
    def authenticate_user_if_not_home_page!
      authenticate_user! unless request.path == '/'
    end
end
